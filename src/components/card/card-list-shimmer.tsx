import {baseColor} from '@app/utils/base-color';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  emptyLabel: string;
  loading: boolean;
};
export const CardListShimmer = (props: Props) => {
  const {emptyLabel, loading} = props;
  return (
    <>
      {loading ? (
        Array.from({length: 3}).map((_, index) => (
          <View key={index} style={styles.container} />
        ))
      ) : (
        <View>
          <Text>{emptyLabel}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: baseColor.grey,
    alignItems: 'center',
    height: 100,
    marginBottom: 10,
  },
});
