import {CardTransaction} from '@app/components/card';
import {ModalFilter} from '@app/components/modal';
import {SearchFilter} from '@app/components/search';
import {navigationRef} from '@app/routes';
import {baseColor} from '@app/utils/base-color';
import {FILTER} from '@app/utils/constant';
import {useState} from 'react';
import {FlatList, View} from 'react-native';
import {RESPONSE_LIST} from './mock-data';

export const TransactionListView = () => {
  const transactionList = Object.values(RESPONSE_LIST);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  function filterResults(
    searchResults: typeof transactionList,
    filterKey: string,
  ) {
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

  function searchAndFilterArrayData(searchTerm: string, filterKey: string) {
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
  return (
    <View style={{backgroundColor: baseColor.bg, flex: 1}}>
      <ModalFilter
        visible={showFilter}
        filter={filter}
        onRequestClose={() => setShowFilter(false)}
        onPressFilter={key => {
          setFilter(key);
          setShowFilter(false);
        }}
      />
      <View style={{margin: 10}}>
        <SearchFilter
          labelFilter={FILTER.find(i => i.key == filter)?.label ?? ''}
          onChangeText={text => setSearch(text)}
          onPressFilter={() => setShowFilter(true)}
          value={search}
        />
      </View>
      <FlatList
        data={searchAndFilterArrayData(search, filter)}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CardTransaction
            amount={item.amount}
            date={item.completed_at}
            fromBank={item.beneficiary_bank}
            name={item.beneficiary_name}
            onPress={() =>
              navigationRef.navigate('transaction-detail', {id: item.id})
            }
            status={item.status}
            toBank={item.sender_bank}
          />
        )}
        contentContainerStyle={{
          marginHorizontal: 10,
          paddingBottom: 30,
        }}
      />
    </View>
  );
};
