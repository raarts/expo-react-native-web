import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';

const AppLoginStackNavigator = StackNavigator(
  {
    Main: {
      screen: LoginScreen,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  },
);

export default AppLoginStackNavigator;
