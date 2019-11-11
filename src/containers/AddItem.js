import React, { Component } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Left,
  Right,
  Content,
  Text,
  Button,
  Title,
  Icon,
  Body,
  Form,
  Item,
  Picker,
  Label,
  Input
} from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import * as Types from '../Types';
import { getCustomers } from '../actions/customer';
import showError from '../components/showError';
import Loader from '../components/Loader';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      category: '',
      customers: [],
      isLoading: false
    };
  }

  componentDidMount = () => {
    this.getCustomers();
  }

  getCustomers = () => {
    this.setState({ isLoading: true });
    getCustomers().then((customers: Types.Customer[]) => {
      customers = customers.map((element) => {
        return { value: element.fullName }
      });
      this.setState({ customers, isLoading: false });
    }).catch((error) => {
      showError(error.message);
    });
  }

  onGenderChange = gender => {
    this.setState({ gender });
  };

  onCategoryChange = category => {
    this.setState({ category });
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" type="Ionicons" />
            </Button>
          </Left>
          <Body>
            <Title>Add Item</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Loader isLoading={this.state.isLoading} />
          <View style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Dropdown
                label="Customer"
                data={this.state.customers}
                dropdownPosition={0}
                containerStyle={{ flex: 1, marginRight: 10 }}
                dropdownOffset={{ top: 20, left: 0 }}
              />
              <Button
                onPress={() => this.props.navigation.navigate('AddCustomer')}>
                <Icon name="add" />
              </Button>
            </View>
            <Dropdown
              label="Gender"
              dropdownPosition={0}
              data={[{ value: 'Male' }, { value: 'Female' }]}
              dropdownOffset={{ top: 20, left: 0 }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Dropdown
                label="Category"
                data={[
                  { value: 'Shirt' },
                  { value: 'Pent' },
                  { value: 'Dress' },
                  { value: 'Sari' },
                  { value: 'Kurta' }
                ]}
                dropdownPosition={0}
                containerStyle={{ flex: 1, marginRight: 10 }}
                dropdownOffset={{ top: 20, left: 0 }}
              />
              <Button
                onPress={() => this.props.navigation.navigate('AddCustomer')}>
                <Icon name="add" />
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  dropdownContainer: {
    // paddingHorizontal: 10
  }
});

export default AddItem;
