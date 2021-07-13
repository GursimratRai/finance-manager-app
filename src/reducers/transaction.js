import {
    TRANSACTION_START,
    TRANSACTION_SUCCESS,
    TRANSACTION_FAILED,
    UPDATE_TRANSACTIONS,
  } from "../actions/actionTypes";
  
  const initialTransactionState = {
    transactions: [],
    error: null,
    inProgress: false,
  };
  
  export default function transaction(state = initialTransactionState, action) {
    switch (action.type) {
      case UPDATE_TRANSACTIONS:
        return {
          ...state,
          transactions: action.transactions,
        };
      case TRANSACTION_START:
        return {
          ...state,
          inProgress: true,
        };
      case TRANSACTION_SUCCESS:
        return {
          ...state,
          transactions : [action.transaction,...state.transactions,],
          inProgress: false,
          error: action.error,
        };
      case TRANSACTION_FAILED:
        return {
          ...state,
          inProgress: false,
          error: action.error,
        };
      default:
        return state;
    }
  }
  