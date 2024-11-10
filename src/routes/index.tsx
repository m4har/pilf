import {TransactionDetailView} from '@app/screens/transaction-detail/transaction-detail.view';
import {TransactionListView} from '@app/screens/transaction-list/transaction-list.view';
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
        component={TransactionListView}
        options={{
          title: 'Transaksi',
          headerStyle: {backgroundColor: baseColor.orange},
          headerTitleStyle: {color: baseColor.white},
        }}
      />
      <Screen
        name="transaction-detail"
        component={TransactionDetailView}
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
