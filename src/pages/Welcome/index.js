import React, { Component } from 'react';
import AsyncStorage, { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Api from '../../services/api';
import Styles from './styles';

class Welcome extends Component {
  state = {
    username: '',
    loading: false,
  }

  checkUserExists = async (username) => {
    const user = await Api.get(`/users/${username}`);

    return user;
  }

  saveUser = async (username) => {
    await AsyncStorage.setItem('@Githuber:username', username);
  }

  signIn = async () => {
    const { username } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });
    try {
      await this.checkUserExists(username);
      await this.saveUser(username);
      console.tron.log('Usuário logado');

      navigation.navigate('Repositories');
    } catch (error) {
      this.setState({ loading: false });
      console.tron.log('Usuário não existe');
    }
  };

  render() {
    const { username, loading } = this.state;
    return (
      <View style={Styles.container}>
        <Text style={Styles.title}>Bem-vindo</Text>
        <Text style={Styles.text}>Para continuar precisamos que você informe seu usuário</Text>

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
