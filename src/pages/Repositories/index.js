import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
class Repositories extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name="list-alt" size={30} color={tintColor} />,
  }


  render() {
    return (
      <View>
        <Header title="Repositórios" />
      </View>
    );
  }
}

export default Repositories;
