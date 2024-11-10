import {LabelDesc} from '@app/components/label';
import {baseColor} from '@app/utils/base-color';
import {useCallback, useState} from 'react';
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
  const [showDetail, setShowDetail] = useState(false);

  const onShowHideDetail = useCallback(() => {
    setShowDetail(prev => !prev);
  }, []);

  const onCopyClipboard = useCallback(() => {
    ToastAndroid.show('ID Transaksi Telah Disalin', ToastAndroid.SHORT);
  }, []);
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
              Permata
            </Text>
            <Icon name="arrow-forward" size={20} />
            <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
              BNI
            </Text>
          </View>
          {/* desc */}
          <View style={{marginTop: 16, flexDirection: 'row'}}>
            <LabelDesc style={{flex: 1}} title="syifa" desc="123" />
            <LabelDesc style={{flex: 1}} title="nominal" desc="Rp 10.000" />
          </View>
          <View style={{marginTop: 16, flexDirection: 'row'}}>
            <LabelDesc
              style={{flex: 1}}
              title="berita transfer"
              desc="cobe test"
            />
            <LabelDesc style={{flex: 1}} title="kode unik" desc="123" />
          </View>
          <View style={{marginTop: 16, flexDirection: 'row'}}>
            <LabelDesc
              style={{flex: 1}}
              title="waktu dibuat"
              desc="8 april 2024"
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
