import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Repositories from './pages/Repositories';
import Welcome from './pages/Welcome';

const Routes = createAppContainer(createSwitchNavigator({
  Welcome,
  Repositories,
}));

export default Routes;
