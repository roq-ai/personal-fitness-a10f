import axios from 'axios';
import queryString from 'query-string';
import { CreditTransactionInterface, CreditTransactionGetQueryInterface } from 'interfaces/credit-transaction';
import { GetQueryInterface } from '../../interfaces';

export const getCreditTransactions = async (query?: CreditTransactionGetQueryInterface) => {
  const response = await axios.get(`/api/credit-transactions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCreditTransaction = async (creditTransaction: CreditTransactionInterface) => {
  const response = await axios.post('/api/credit-transactions', creditTransaction);
  return response.data;
};

export const updateCreditTransactionById = async (id: string, creditTransaction: CreditTransactionInterface) => {
  const response = await axios.put(`/api/credit-transactions/${id}`, creditTransaction);
  return response.data;
};

export const getCreditTransactionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/credit-transactions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCreditTransactionById = async (id: string) => {
  const response = await axios.delete(`/api/credit-transactions/${id}`);
  return response.data;
};
