import {
  TRANSACTION_START,
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILED,
  UPDATE_TRANSACTIONS,
  DELETE_TRANSACTION_START,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILED,
  UPDATE_TRANSACTION_START,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAILED,
} from "./actionTypes";

//Helpers
import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
//ant design component
import { notification } from "antd";

//update action
export function updateTransactions(transactions) {
  return {
    type: UPDATE_TRANSACTIONS,
    transactions,
  };
}

//function for fetching all the transaction list / data from the database
export function fetchTransactionList() {
  return (dispatch) => {
    const url = APIUrls.fetchTransactionList();
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
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

//Start the transaction
export function startTransaction() {
  return {
    type: TRANSACTION_START,
  };
}

//If transaction failed
export function transactionFailed(errorMessage) {
  return {
    type: TRANSACTION_FAILED,
    error: errorMessage,
  };
}

//If transaction is complete i.e. success
export function transactionSuccess(transaction, error) {
  return {
    type: TRANSACTION_SUCCESS,
    transaction,
    error,
  };
}

//Sending Api Request  for creating a new transaction in the database
export function createTransaction(content) {
  return (dispatch) => {
    dispatch(startTransaction());
    const url = APIUrls.addTransaction();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody(content),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(transactionSuccess(data.data.transaction, data.message));
          notification.success({
            message: "Transaction Successfully added",
            style: {
              borderRadius: 5,
              backgroundColor: "#9cda7e",
              borderColor: "#2f6316",
            },
          });
          return;
        }
        dispatch(transactionFailed(data.message));
        notification.error({
          message: "Error",
          style: {
            borderRadius: 5,
            backgroundColor: "#e89795",
            borderColor: "#880411",
          },
        });
      });
  };
}

//Start action for deleting a transaction 
export function startDelete() {
  return {
    type: DELETE_TRANSACTION_START,
  };
}
//If the transaction is deleted from the database
export function deleteSuccess(ids, error) {
  return {
    type: DELETE_TRANSACTION_SUCCESS,
    ids,
    error,
  };
}

//If delete request is not complete
export function deleteFailed(error) {
  return {
    type: DELETE_TRANSACTION_FAILED,
    error,
  };
}

//Sending an Api Request for deleting the transactions from the database
export function deleteTransaction(ids) {
  return (dispatch) => {
    dispatch(startDelete());
    const url = APIUrls.deleteTransaction();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: JSON.stringify(ids),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(deleteSuccess(ids, data.message));
          notification.success({
            message: "Transaction Deleted Successfully",
            style: {
              borderRadius: 5,
              backgroundColor: "#9cda7e",
              borderColor: "#2f6316",
            },
          });
          return;
        }

        dispatch(deleteFailed(data.message));
        notification.error({
          message: "Error",
          style: {
            borderRadius: 5,
            backgroundColor: "#e89795",
            borderColor: "#880411",
          },
        });
      });
  };
}

//Start action for updating a transaction
export function startUpdate() {
  return {
    type: UPDATE_TRANSACTION_START,
  };
}

//If Update Request is complete
export function updateSuccess(transaction,error) {
  return {
    type: UPDATE_TRANSACTION_SUCCESS,
    transaction,
    error,
  };
}
//If update reqest is not complete or denied 
export function updateFailed(error) {
  return {
    type: UPDATE_TRANSACTION_FAILED,
    error,
  };
}

//Sending an Api Request for updating the transaction data with new data
export function updateTransaction(id, content) {

  return (dispatch) => {
    dispatch(startUpdate());
    const url = APIUrls.updateTransaction(id);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody(content),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(updateSuccess(data.data.transaction,data.message));
          notification.success({
            message: "Transaction Updated Successfully",
            style: {
              borderRadius: 5,
              backgroundColor: "#9cda7e",
              borderColor: "#2f6316",
            },
          });
          return;
        }

        dispatch(updateFailed(data.message));
        notification.error({
          message: "Error",
          style: {
            borderRadius: 5,
            backgroundColor: "#e89795",
            borderColor: "#880411",
          },
        });
      });
  };
}
