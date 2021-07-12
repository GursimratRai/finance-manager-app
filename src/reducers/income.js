import {
  INCOME_START,
  INCOME_SUCCESS,
  INCOME_FAILED,
  UPDATE_INCOMES,
} from "../actions/actionTypes";

const initialIncomeState = {
  income: {},
  incomes: [],
  error: null,
  inProgress: false,
};

export default function income(state = initialIncomeState, action) {
  switch (action.type) {
    case UPDATE_INCOMES:
      return {
        ...state,
        incomes: action.incomes,
      };
    case INCOME_START:
      return {
        ...state,
        inProgress: true,
      };
    case INCOME_SUCCESS:
      return {
        ...state,
        incomes: [action.income,...state.incomes,],
        inProgress: false,
        error: action.error,
      };
    case INCOME_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    default:
      return state;
  }
}
