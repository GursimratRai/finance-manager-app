const API_ROOT = 'http://localhost:8000/api/v1';

export const APIUrls = {
  login : () => `${API_ROOT}/users/login`,
  signup : () => `${API_ROOT}/users/signup`,
  addTransaction : () => `${API_ROOT}/transaction/create`,
  fetchTransactionList : () => `${API_ROOT}/transaction/transactions`,
};
