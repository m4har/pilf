import BaseRouter from '@app/routes';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <BaseRouter />
    </NavigationContainer>
  );
}
