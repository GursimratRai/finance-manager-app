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
} from "../actions/actionTypes";

//initial transaction state
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
        transactions: [action.transaction, ...state.transactions],
        inProgress: false,
        error: action.error,
      };
    case TRANSACTION_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case DELETE_TRANSACTION_START:
      return {
        ...state,
        inProgress: true,
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        inProgress: false,
        error: action.error,
        transactions: state.transactions.filter(function (value, index) {
          return action.ids._id.indexOf(value._id) === -1;
        }),
      };
    case DELETE_TRANSACTION_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case UPDATE_TRANSACTION_START:
      return {
        ...state,
        inProgress: true,
      };
    case UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        inProgress: false,
        error: action.error,
        transactions : state.transactions.map(transaction => {
          return transaction._id === action.transaction._id? action.transaction: transaction
        })
      };
    case UPDATE_TRANSACTION_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    default:
      return state;
  }
}
