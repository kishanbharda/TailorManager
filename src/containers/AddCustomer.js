import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
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
  Textarea
} from 'native-base';
import CButton from '../components/CButton';
import * as Types from '../Types';
import { getShadow } from '../../config/Styles';
import { addCustomer, getCustomers } from '../actions/customer';
import CText from '../components/CText';

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      address: '',
      mobile: '',
      isLoading: false,
      customers: []
    };
  }

  onGenderChange = gender => {
    this.setState({ gender });
  };

  onCategoryChange = category => {
    this.setState({ category });
  };

  addCustomer = async () => {
    this.setState({ isLoading: true });
    const customer: Types.Customer = {
      fullName: this.state.fullName,
      address: this.state.address,
      mobile: this.state.mobile
    };

    await addCustomer(customer);
    this.setState({ isLoading: false });
  };

  getCustomers = async () => {
    this.setState({ isLoading: true });
    const customers: Types.Customer[] = await getCustomers();
    this.setState({ customers, isLoading: false });
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" type="Ionicons" />
            </Button>
          </Left>
          <Body>
            <Title>Add Customer</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form>
            <View>
              <CText>Full Name</CText>
              <Input
                style={styles.field}
                onChangeText={fullName => this.setState({ fullName })}
              />
            </View>
            <View>
              <CText>Address</CText>
              <Textarea
                rowSpan={5}
                placeholder="Address"
                style={styles.field}
                onChangeText={address => this.setState({ address })}
              />
            </View>
            <View>
              <CText>Mobile</CText>
              <Input
                style={styles.field}
                onChangeText={mobile => this.setState({ mobile })}
              />
            </View>

            <CButton
              onPress={this.addCustomer}
              isLoading={this.state.isLoading}>
              SAVE
            </CButton>

            <CButton onPress={this.getCustomers}>GET CUSTOMERS</CButton>

            <CText>{JSON.stringify(this.state.customers)}</CText>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  field: {
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#dddddd',
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    backfaceVisibility: 'hidden',
    ...getShadow()
  }
});

export default AddCustomer;
