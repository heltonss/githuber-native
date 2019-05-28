import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Text, TouchableOpacity, View, AsyncStorage, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './styles';

class Header extends Component  {

  static propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  signOut = async () => {
    const { navigation } = this.props;
    await AsyncStorage.clear();

    navigation.navigate('Welcome');
  }

  render() {
    const { title } = this.props;

    return (
      <View style={Styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={Styles.left} />
        <Text style={Styles.title}>{title}</Text>
        <TouchableOpacity onPress={this.signOut}>
          <Icon name="exchange" size={16} style={Styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Header);
