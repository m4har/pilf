import {baseColor} from '@app/utils/base-color';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  labelFilter: string;
  onPressFilter: () => void;
};
export const SearchFilter = (props: Props) => {
  const {value, onChangeText, labelFilter, onPressFilter} = props;
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Icon name="search" size={35} color={baseColor.grey} />
      </View>
      <TextInput
        placeholder="Cari Nama, Bank, atau Nominal"
        style={styles.inputSearch}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.btnFilter} onPress={onPressFilter}>
        <Text style={styles.txtFilter} numberOfLines={2}>
          {labelFilter}
        </Text>
        <Icon name="keyboard-arrow-down" color={baseColor.orange} size={35} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: baseColor.white,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
  },
  search: {alignItems: 'center', justifyContent: 'center'},
  inputSearch: {flex: 1, height: 40},
  btnFilter: {flexDirection: 'row', alignItems: 'center'},
  txtFilter: {color: baseColor.orange, fontWeight: 'bold', width: 65},
});
