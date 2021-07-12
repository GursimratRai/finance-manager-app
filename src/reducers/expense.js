import {
  EXPENSE_START,
  EXPENSE_SUCCESS,
  EXPENSE_FAILED,
  UPDATE_EXPENSES,
} from "../actions/actionTypes";

const initialExpenseState = {
  expense: {},
  expenses: [],
  error: null,
  inProgress: false,
};

export default function expense(state = initialExpenseState, action) {
  switch (action.type) {
    case UPDATE_EXPENSES:
      return {
        ...state,
        expenses: action.expenses,
      };
    case EXPENSE_START:
      return {
        ...state,
        inProgress: true,
      };
    case EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: [action.expense,...state.expenses],
        inProgress: false,
        error: action.error,
      };
    case EXPENSE_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    default:
      return state;
  }
}
