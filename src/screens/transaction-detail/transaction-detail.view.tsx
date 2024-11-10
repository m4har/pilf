import {LabelDesc} from '@app/components/label';
import {navigationRef} from '@app/routes';
import {useTransactionsStore} from '@app/services/transaction-list/transaction-list.hooks';
import {baseColor} from '@app/utils/base-color';
import {formatToRupiah} from '@app/utils/currency';
import {formatDateToIndonesian} from '@app/utils/date';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  route: {
    params: {
      id: string;
    };
  };
};
export const TransactionDetailView = (props: Props) => {
  const {id} = props.route.params;

  const transactions = useTransactionsStore(state => state.transactions);
  const transactionDetail = useMemo(
    () => transactions?.[id] ?? null,
    [transactions, id],
  );
  const [showDetail, setShowDetail] = useState(false);

  const onShowHideDetail = useCallback(() => {
    setShowDetail(prev => !prev);
  }, []);

  const onCopyClipboard = useCallback(() => {
    ToastAndroid.show('ID Transaksi Telah Disalin', ToastAndroid.SHORT);
  }, []);

  useEffect(() => {
    if (!Boolean(transactionDetail)) {
      navigationRef.goBack();
    }
  }, [transactionDetail]);
  return (
    <View style={styles.container}>
      <View style={styles.headerTitle}>
        <Text style={{fontWeight: 'bold'}}>ID TRANSAKSI: #{id}</Text>
        <TouchableOpacity onPress={onCopyClipboard}>
          <Icon name="content-copy" color={baseColor.orange} size={20} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.detailContainer}
        onPress={onShowHideDetail}>
        <Text style={{fontWeight: 'bold', flex: 1}}>DETAIL TRANSAKSI</Text>
        <View>
          <Text style={{color: baseColor.orange}}>
            {showDetail ? 'Tutup' : 'Buka'}
          </Text>
        </View>
      </TouchableOpacity>

      {showDetail && (
        <View style={{backgroundColor: baseColor.white, padding: 16}}>
          {/* bank */}
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
              {transactionDetail?.beneficiary_bank}
            </Text>
            <Icon name="arrow-forward" size={20} />
            <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
              {transactionDetail?.sender_bank}
            </Text>
          </View>
          {/* desc */}
          <View style={{marginTop: 16, flexDirection: 'row'}}>
            <LabelDesc
              style={{flex: 1}}
              title={transactionDetail?.beneficiary_name}
              desc={transactionDetail?.account_number}
            />
            <LabelDesc
              style={{flex: 1}}
              title="nominal"
              desc={formatToRupiah(transactionDetail?.amount ?? 0)}
            />
          </View>
          <View style={{marginTop: 16, flexDirection: 'row'}}>
            <LabelDesc
              style={{flex: 1}}
              title="berita transfer"
              desc={transactionDetail?.remark}
            />
            <LabelDesc style={{flex: 1}} title="kode unik" desc="123" />
          </View>
          <View style={{marginTop: 16, flexDirection: 'row'}}>
            <LabelDesc
              style={{flex: 1}}
              title="waktu dibuat"
              desc={formatDateToIndonesian(transactionDetail?.created_at ?? '')}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: baseColor.bg},
  headerTitle: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 5,
    backgroundColor: baseColor.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: baseColor.bg,
    alignItems: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: baseColor.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: baseColor.bg,
  },
});
