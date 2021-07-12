import { INCOME_START, INCOME_SUCCESS, INCOME_FAILED ,UPDATE_INCOMES} from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import {notification} from 'antd';


export function fetchIncomeList() {
  return (dispatch) => {
    const url = APIUrls.fetchIncomeList();
    fetch(url, {
      method: "GET",
      headers: {
        'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(updateIncomes(data.data.incomes));
          return;
        }
      });
  };
}

export function updateIncomes(incomes) {
  return {
      type:UPDATE_INCOMES,
      incomes
  }
}

export function startIncome() {
  return {
    type: INCOME_START,
  };
}

export function incomeFailed(errorMessage) {
  return {
    type: INCOME_FAILED,
    error: errorMessage,
  };
}

export function incomeSuccess(income,error) {
  return {
    type: INCOME_SUCCESS,
    income,
    error
  };
}

export function createIncome(source, amount, date, category, description) {
  return (dispatch) => {
    dispatch(startIncome());
    const url = APIUrls.addIncome();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
      },
      body: getFormBody(source, amount, date, category, description),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(incomeSuccess(data.data.income,data.message));
          notification.success({
            message:'Income Successfully added',
            style:{
              borderRadius:5,
              backgroundColor:'#9cda7e',
              borderColor:'#2f6316',
            }
          })
          return;
        }
        dispatch(incomeFailed(data.message));
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
