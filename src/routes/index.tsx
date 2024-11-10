import {baseColor} from '@app/utils/base-color';
import {createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type RootStackParamList = {
  'transaction-list': undefined;
  'transaction-detail': {id: string};
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const BaseRouter = () => {
  return (
    <Navigator>
      <Screen
        name="transaction-list"
        component={
          require('@app/screens/transaction-list/transaction-list.view').default
        }
        options={{
          title: 'Transaksi',
          headerStyle: {backgroundColor: baseColor.orange},
          headerTitleStyle: {color: baseColor.white},
        }}
      />
      <Screen
        name="transaction-detail"
        component={
          require('@app/screens/transaction-detail/transaction-detail.view')
            .default
        }
        options={{
          title: 'Detail Transaksi',
          headerStyle: {backgroundColor: baseColor.orange},
          headerTitleStyle: {color: baseColor.white},
        }}
      />
    </Navigator>
  );
};

export default BaseRouter;
