const API_ROOT = 'https://finance-manager-api-g.herokuapp.com/api/v1';

export const APIUrls = {
  login : () => `${API_ROOT}/users/login`,
  signup : () => `${API_ROOT}/users/signup`,
  addTransaction : () => `${API_ROOT}/transaction/create`,
  fetchTransactionList : () => `${API_ROOT}/transaction/transactions`,
  deleteTransaction : () => `${API_ROOT}/transaction/delete`,
  updateTransaction : (id) => `${API_ROOT}/transaction/update?id=${id}`,

};
