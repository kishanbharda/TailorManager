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
  Input,
  Card
} from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import SearchableDropdown from 'react-native-searchable-dropdown';
import * as Types from '../Types';
import { getCustomers } from '../actions/customer';
import { getCategories } from '../actions/category';
import showError from '../components/showError';
import Loader from '../components/Loader';
import CText from '../components/CText';
import CButton from '../components/CButton';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoriesToDisplay: [],
      selectedCategory: '',
      customers: [],
      selectedCustomer: null,
      sizes: [],
      isLoading: false
    };
  }

  componentDidMount = () => {
    this.setState({ isLoading: true });
    Promise.all([this.getCustomers(), this.getCategories()]).then(() => {
      this.setState({ isLoading: false });
    });
  };

  getCategories = async () => {
    const categories: Types.Category[] = await getCategories();
    this.setState({ categories });
  };

  getCustomers = () => {
    this.setState({ isLoading: true });
    getCustomers()
      .then((customers: Types.Customer[]) => {
        customers = customers.map((element, index) => {
          return { ...element, name: element.value };
        });
        this.setState({ customers, isLoading: false });
      })
      .catch(error => {
        showError(error.message);
      });
  };

  onGenderChange = gender => {
    this.setState({ gender });
  };

  onCategoryChange = category => {
    this.setState({ category });
  };

  handleCustomerChanges = customer => {
    console.log(customer);
    const categoriesToDisplay = this.state.categories.filter(
      category =>
        category.gender.toLowerCase() === customer.gender.toLowerCase()
    );
    this.setState({
      selectedCustomer: customer,
      categoriesToDisplay,
      selectedCategory: '',
      sizes: []
    });
  };

  handleCategoryChanges = (category, index, data) => {
    this.setState({ selectedCategory: category });
    const sizes = [];
    this.state.categoriesToDisplay[index].sizes.forEach(size => {
      sizes.push({
        name: size,
        value: ''
      });
    });
    this.setState({ sizes });
  };

  saveItem = () => {
    console.log(this.state.selectedCategory);
    console.log(this.state.selectedCustomer);
    const item: Types.ITEM = {
      category: this.state.selectedCategory,
      customer: this.state.selectedCustomer.value,
      sizes: this.state.sizes
    };

    console.log(item);
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
        <Content padder>
          <Loader isLoading={this.state.isLoading} />
          <View
            style={{
              padding: 10,
              borderWidth: 0.5,
              borderRadius: 10,
              borderColor: '#dddddd'
            }}>
            <CText style={{ marginBottom: 10 }}>Customer Detail</CText>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SearchableDropdown
                onItemSelect={this.handleCustomerChanges}
                containerStyle={{ paddingRight: 5, flex: 1 }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 150, flex: 1 }}
                items={this.state.customers}
                defaultIndex={0}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Search Customer',
                  underlineColorAndroid: 'transparent',
                  style: {
                    paddingHorizontal: 10,
                    height: 40,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    flex: 1
                  }
                }}
                listProps={{
                  nestedScrollEnabled: true
                }}
              />
              <Button
                style={{ alignSelf: 'flex-start' }}
                onPress={() => this.props.navigation.navigate('AddCustomer')}>
                <Icon name="add" />
              </Button>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10
              }}>
              <Dropdown
                value={this.state.selectedCategory}
                label="Category"
                data={this.state.categoriesToDisplay}
                dropdownPosition={0}
                containerStyle={{ flex: 1, marginRight: 10 }}
                dropdownOffset={{ top: 20, left: 0 }}
                onChangeText={(value, index) =>
                  this.handleCategoryChanges(value, index)
                }
              />
              <Button
                onPress={() => this.props.navigation.navigate('AddCustomer')}>
                <Icon name="add" />
              </Button>
            </View>
          </View>

          <Card>
            {this.state.sizes.map((size, index) => (
              <Item key={index.toString()}>
                <Label>{size.name}</Label>
                <Input
                  keyboardType="decimal-pad"
                  value={size.value}
                  onChangeText={text => {
                    const { sizes } = this.state;
                    sizes[index].value = text;
                    this.setState({ sizes });
                  }}
                />
              </Item>
            ))}
          </Card>
          <CButton onPress={this.saveItem}>SAVE</CButton>
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
