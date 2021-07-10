import { EXPENSE_START, EXPENSE_SUCCESS, EXPENSE_FAILED } from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import {notification} from 'antd';

export function startExpense() {
  return {
    type: EXPENSE_START,
  };
}

export function expenseFailed(errorMessage) {
  return {
    type: EXPENSE_FAILED,
    error: errorMessage,
  };
}

export function expenseSuccess(expense,error) {
  return {
    type: EXPENSE_SUCCESS,
    expense,
    error
  };
}

export function createExpense(source, amount, date, category, description) {
  return (dispatch) => {
    dispatch(startExpense());
    const url = APIUrls.addExpense();
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
          dispatch(expenseSuccess(data.data.expense,data.message));
          notification.success({
            message:'Expense Successfully added',
            style:{
              borderRadius:5,
              backgroundColor:'#9cda7e',
              borderColor:'#2f6316',
            }
          })
          return;
        }
        dispatch(expenseFailed(data.message));
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
