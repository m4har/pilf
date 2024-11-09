import {baseColor} from '@app/utils/base-color';
import {formatToRupiah} from '@app/utils/currency';
import {formatDateToIndonesian} from '@app/utils/date';
import {Text} from '@react-navigation/elements';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  onPress: () => void;
  fromBank: string;
  toBank: string;
  name: string;
  amount: number;
  date: string;
  status: string;
};
type BorderStatus = keyof typeof borderColor;
type Status = 'PENDING' | 'SUCCESS';

const borderColor = {
  PENDING: baseColor.orange,
  SUCCESS: baseColor.green,
};

const textColor = {
  PENDING: baseColor.black,
  SUCCESS: baseColor.white,
};

const statusLabel = {
  PENDING: 'Pengecekan',
  SUCCESS: 'Berhasil',
};

const isValidStatus = (status: string): status is BorderStatus => {
  return status in borderColor;
};

export const CardTransaction = (props: Props) => {
  const {amount, date, fromBank, name, onPress, status, toBank} = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isValidStatus(status)
          ? {borderColor: borderColor[status]}
          : {borderColor: baseColor.orange},
      ]}
      onPress={onPress}>
      <View style={{flex: 1}}>
        <View style={styles.bank}>
          <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
            {fromBank}
          </Text>
          <Icon name="arrow-forward" size={20} />
          <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
            {toBank}
          </Text>
        </View>
        <View>
          <Text>{name}</Text>
        </View>
        <View style={styles.nominal}>
          <Text>{formatToRupiah(amount)}</Text>
          <Icon name="circle" size={7} />
          <Text>{formatDateToIndonesian(date)}</Text>
        </View>
      </View>
      <View style={[styles.status, statusStyle[status as Status]]}>
        <Text style={{fontWeight: 'bold', color: textColor[status as Status]}}>
          {statusLabel[status as Status]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 10,
    borderColor: baseColor.orange,
    backgroundColor: baseColor.white,
    alignItems: 'center',
    marginBottom: 10,
  },
  bank: {flexDirection: 'row', alignItems: 'center', gap: 5},
  nominal: {flexDirection: 'row', alignItems: 'center', gap: 5},
  status: {
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
  },
  pending: {
    borderColor: baseColor.orange,
  },
  success: {
    borderColor: baseColor.green,
    backgroundColor: baseColor.green,
  },
});

const statusStyle = {
  PENDING: styles.pending,
  SUCCESS: styles.success,
};
