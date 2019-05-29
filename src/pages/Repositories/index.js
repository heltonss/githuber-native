import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
import api from '../../services/api';
import RepositoryItems from './RepositoryItem';
import Style from './styles';

class Repositories extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name="list-alt" size={30} color={tintColor} />,
  }

  state = {
    data: [],
    loading: true,
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/repos`);

    this.setState({ data, loading: false });
  }

  renderListItem = ({ item }) => <RepositoryItems repository={item} />

  renderList = () => {
    const { data } = this.state;
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
      />
    )

  }

  render() {
    const { loading } = this.state;
    return (
      <View>
        <Header title="Repositórios" />
        {
          loading
            ? <ActivityIndicator style={Style.loading} />
            : this.renderList()
        }
      </View>
    );
  }
}

export default Repositories;
