import { createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import Organizations from './pages/organizations';
import Repositories from './pages/Repositories';
import Welcome from './pages/Welcome';
import { colors } from './Styles';

const Routes = (userLogged = false) => createAppContainer(createSwitchNavigator(
  {
    Welcome,
    User: createBottomTabNavigator({
      Repositories,
      Organizations,
    },
      {
        showIcon: true,
        showLabel: false,
        activeTintColor: colors.white,
        inactiveTintColor: colors.transparent,
        style: {
          backgroundColor: colors.secondary,
        },
      }
    ),
  }, {
    initialRouteName: userLogged ? 'User' : 'Welcome',
  },
));

export default Routes;
