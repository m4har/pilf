import {baseColor} from '@app/utils/base-color';
import {FILTER} from '@app/utils/constant';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  visible: boolean;
  onRequestClose: () => void;
  onPressFilter: (key: string) => void;
  filter: string;
};

export const ModalFilter = (props: Props) => {
  const {onPressFilter, onRequestClose, visible, filter} = props;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
      style={{flex: 1}}>
      <View style={styles.modal}>
        <View style={styles.container}>
          {FILTER.map(i => (
            <TouchableOpacity
              key={i.key}
              onPress={() => onPressFilter(i.key)}
              style={styles.btnFilter}>
              <Icon
                name={filter == i.key ? 'radio-button-on' : 'radio-button-off'}
                color={baseColor.orange}
                size={25}
              />
              <Text style={{fontWeight: '600'}}>{i.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: baseColor.white,
    borderRadius: 10,
    padding: 16,
    width: '80%',
  },
  btnFilter: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
});
