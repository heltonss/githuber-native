import Reactotron from 'reactotron-react-native';
import host from '../services/host';

if (__DEV__) {
  const tron = Reactotron.configure({ host })
    .useReactNative()
    .connect();

  console.tron = tron;
}
