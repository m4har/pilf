import {TransactionDetailView} from '@app/screens/transaction-detail/transaction-detail.view';
import {TransactionListView} from '@app/screens/transaction-list/transaction-list.view';
import {baseColor} from '@app/utils/base-color';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

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
      <Screen name="transaction-detail" component={TransactionDetailView} />
    </Navigator>
  );
};

export default BaseRouter;
