const API_ROOT = 'http://localhost:8000/api/v1';

export const APIUrls = {
  login : () => `${API_ROOT}/users/login`,
  signup : () => `${API_ROOT}/users/signup`,
  addIncome : () => `${API_ROOT}/income/create`,
  addExpense : () => `${API_ROOT}/expense/create`
};
