import { TRANSACTION_START, TRANSACTION_SUCCESS, TRANSACTION_FAILED ,UPDATE_TRANSACTIONS} from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import {notification} from 'antd';


export function fetchTransactionList() {
  return (dispatch) => {
    const url = APIUrls.fetchTransactionList();
    fetch(url, {
      method: "GET",
      headers: {
        'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(updateTransactions(data.data.transactions));
          return;
        }
      });
  };
}

export function updateTransactions(transactions) {
  return {
      type:UPDATE_TRANSACTIONS,
      transactions
  }
}

export function startTransaction() {
  return {
    type: TRANSACTION_START,
  };
}

export function transactionFailed(errorMessage) {
  return {
    type: TRANSACTION_FAILED,
    error: errorMessage,
  };
}

export function transactionSuccess(transaction,error) {
  return {
    type: TRANSACTION_SUCCESS,
    transaction,
    error
  };
}

export function createTransaction(type,source, amount, date, category, description) {
  return (dispatch) => {
    dispatch(startTransaction());
    const url = APIUrls.addTransaction();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
      },
      body: getFormBody(type,source, amount, date, category, description),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(transactionSuccess(data.data.transaction,data.message));
          notification.success({
            message:'Transaction Successfully added',
            style:{
              borderRadius:5,
              backgroundColor:'#9cda7e',
              borderColor:'#2f6316',
            }
          })
          return;
        }
        dispatch(transactionFailed(data.message));
        notification.error({
          message:'Error',
          style:{
            borderRadius:5,
            backgroundColor: '#e89795',
            borderColor: '#880411'
          }
        })
      });
  };
}
