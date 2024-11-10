import {Transaction} from '@app/services/transaction-list/transaction-list.types';

function filterResults(searchResults: Transaction[], filterKey: string) {
  switch (filterKey) {
    case 'asc':
      return [...searchResults].sort((a, b) =>
        a.beneficiary_name.localeCompare(b.beneficiary_name),
      );
    case 'desc':
      return [...searchResults].sort((a, b) =>
        b.beneficiary_name.localeCompare(a.beneficiary_name),
      );
    case 'newDate':
      return [...searchResults].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    case 'oldDate':
      return [...searchResults].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    default:
      return searchResults;
  }
}

export function searchAndFilterArrayData(
  searchTerm: string,
  filterKey: string,
  transactionList: Transaction[],
) {
  const term = searchTerm.toLowerCase();
  const searchResults = transactionList.filter(
    item =>
      item.amount.toString().includes(term) ||
      item.beneficiary_name.toLowerCase().includes(term) ||
      item.beneficiary_bank.toLowerCase().includes(term) ||
      item.sender_bank.toLowerCase().includes(term),
  );
  return filterResults(searchResults, filterKey);
}
