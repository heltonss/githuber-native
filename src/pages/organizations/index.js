import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
import api from '../../services/api';
import OrganizationItems from './OrganizationItems';
import styles from './styles';

class Organizations extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name="list-alt" size={30} color={tintColor} />,
  }

  state = {
    data: [],
    loading: true,
    refreshing: false,
  }

  componentDidMount() {
    this.loadOrganizations();
  }

  loadOrganizations = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/orgs`);
    console.tron.log('organizacoes ', data);

    this.setState({ data, loading: false, refreshing: false });
  }

  renderListItem = ({ item }) => <OrganizationItems organization={item} />

  renderList = () => {
    const { data, refreshing } = this.state;
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadOrganizations}
        refreshing={refreshing}
        numColumns={2}
        columnWrapperStyle={styles.collumWrapper}
      />
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Organizações" />
        {
          loading
            ? <ActivityIndicator styles={styles.loading} />
            : this.renderList()
        }
      </View>
    );
  }
}

export default Organizations;
