import { INCOME_START, INCOME_SUCCESS, INCOME_FAILED } from "../actions/actionTypes";

const initilIncomeState = {
  income: {},
  error: null,
  inProgress: false,
  isSubmit : false
};

export default function income(state = initilIncomeState, action) {
  switch (action.type) {
    case INCOME_START:
      return {
        ...state,
        inProgress: true,
        isSubmit : false
      };
    case INCOME_SUCCESS:
      return {
        ...state,
        income: action.income,
        isSubmit : true,
        inProgress: false,
        error: action.error,
      };
    case INCOME_FAILED:
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
