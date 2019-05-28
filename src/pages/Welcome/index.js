import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Api from '../../services/api';
import Styles from './styles';
import PropTypes from 'prop-types';
class Welcome extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };
  
  state = {
    username: '',
    loading: false,
    error: false,
  }

  checkUserExists = async (username) => {
    const user = await Api.get(`/users/${username}`);
    console.tron.log('Usuário ', user);

    return user;
  }

  saveUser = async (username) => {
    await AsyncStorage.setItem('@Githuber:username', username);
  }

  signIn = async () => {
    console.tron.log('Usuário logado');
    const { username } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });
    try {
      await this.checkUserExists(username);
      await this.saveUser(username);

      navigation.navigate('Repositories');
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { username, loading, error } = this.state;
    return (
      <View style={Styles.container}>
        <Text style={Styles.title}>Bem-vindo</Text>
        <Text style={Styles.text}>Para continuar precisamos que você informe seu usuário</Text>
        {error && <Text style={Styles.error}>Usuário não encontrado</Text>}
        <View style={Styles.form}>
          <TextInput
            style={Styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuário"
            underlineColorAndroid="transparent"
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />

          <TouchableOpacity
            style={Styles.button}
            onPress={this.signIn}
          >
            {
              loading
                ? <ActivityIndicator size="small" color="#fff" />
                : <Text style={Styles.buttonText}>Prosseguir</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Welcome;
