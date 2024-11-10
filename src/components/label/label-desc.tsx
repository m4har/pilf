import {Text, View, ViewStyle} from 'react-native';

type Props = {
  title?: string;
  desc?: string;
  style?: ViewStyle;
};

export const LabelDesc = (props: Props) => {
  const {title, desc, style} = props;
  return (
    <View style={style}>
      <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
        {title}
      </Text>
      <Text>{desc}</Text>
    </View>
  );
};
