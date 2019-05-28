import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Organizations = () => <View />;

Organizations.navigationOptions = {
  tabBarIcon: ({ tintColor }) => <Icon name="list-alt" size={30} color={tintColor} />,
};

export default Organizations;
