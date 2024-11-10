import {CardListShimmer, CardTransaction} from '@app/components/card';
import {ModalFilter} from '@app/components/modal';
import {SearchFilter} from '@app/components/search';
import {navigationRef} from '@app/routes';
import {useTransactionsStore} from '@app/services/transaction-list/transaction-list.hooks';
import {baseColor} from '@app/utils/base-color';
import {FILTER} from '@app/utils/constant';
import {useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {searchAndFilterArrayData} from './transaction-list.utils';

export const TransactionListView = () => {
  const {fetchTransactions, loading, error, transactions, refetch, refreshing} =
    useTransactionsStore();
  const transactionList = useMemo(
    () => Object.values(transactions ?? {}),
    [transactions],
  );
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);
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
        data={searchAndFilterArrayData(search, filter, transactionList)}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={refetch}
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
        ListEmptyComponent={() => (
          <CardListShimmer loading={loading} emptyLabel="Belum ada transaksi" />
        )}
        contentContainerStyle={{
          marginHorizontal: 10,
          paddingBottom: 30,
        }}
      />
    </View>
  );
};
