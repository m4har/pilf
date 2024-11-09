import {TransactionDetailView} from '@app/screens/transaction-detail/transaction-detail.view';
import {TransactionListView} from '@app/screens/transaction-list/transaction-list.view';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const BaseRouter = () => {
  return (
    <Navigator>
      <Screen name="transaction-list" component={TransactionListView} />
      <Screen name="transaction-detail" component={TransactionDetailView} />
    </Navigator>
  );
};

export default BaseRouter;
