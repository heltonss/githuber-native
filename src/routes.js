import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Repositories from './pages/Repositories';
import Welcome from './pages/Welcome';

const routes = createAppContainer(createSwitchNavigator({
  Welcome,
  Repositories,
}));

export default routes;
