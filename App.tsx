import BaseRouter, {navigationRef} from '@app/routes';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <BaseRouter />
    </NavigationContainer>
  );
}
