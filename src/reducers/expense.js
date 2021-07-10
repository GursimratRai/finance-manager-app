import { EXPENSE_START, EXPENSE_SUCCESS, EXPENSE_FAILED } from "../actions/actionTypes";

const initialExpenseState = {
  expense: {},
  error: null,
  inProgress: false,
  isSubmit : false
};

export default function expense(state = initialExpenseState, action) {
  switch (action.type) {
    case EXPENSE_START:
      return {
        ...state,
        inProgress: true,
        isSubmit : false
      };
    case EXPENSE_SUCCESS:
      return {
        ...state,
        expense: action.expense,
        isSubmit : true,
        inProgress: false,
        error: action.error,
      };
    case EXPENSE_FAILED:
      return {
        ...state,
        inProgress: false,
        isSubmit : false,
        error: action.error,
      };
    default:
      return state;
  }
}
