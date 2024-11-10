import {create} from 'zustand';
import * as apiService from '../api';
import {TransactionsResponse} from './transaction-list.types'; // Import the types here

interface TransactionsStore {
  transactions: TransactionsResponse | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  refetch: () => Promise<void>;
}

export const useTransactionsStore = create<TransactionsStore>(set => ({
  transactions: null,
  loading: false,
  refreshing: false,
  error: null,
  fetchTransactions: async () => {
    set({loading: true, error: null});
    try {
      const response = await apiService.get<TransactionsResponse>(
        '/frontend-test',
      );
      if (!response) throw new Error('Failed to fetch transactions');
      set({transactions: response, loading: false});
    } catch (error) {
      set({error: (error as Error).message, loading: false});
    }
  },

  refetch: async () => {
    set({refreshing: true, error: null, loading: true, transactions: null});
    try {
      const response = await apiService.get<TransactionsResponse>(
        '/frontend-test',
      );
      if (!response) throw new Error('Failed to fetch transactions');
      set({transactions: response, refreshing: false, loading: false});
    } catch (error) {
      set({error: (error as Error).message, refreshing: false, loading: false});
    }
  },
}));
