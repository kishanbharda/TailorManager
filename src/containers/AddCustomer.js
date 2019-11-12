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
  Textarea,
  Toast
} from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import CButton from '../components/CButton';
import * as Types from '../Types';
import { getShadow } from '../../config/Styles';
import { addCustomer, getCustomers } from '../actions/customer';
import CText from '../components/CText';
import showToast from '../components/showToast';
import Messages from '../../config/Messages';

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      fullNameError: '',
      address: '',
      addressError: '',
      mobile: '',
      mobileError: '',
      isLoading: false,
      gender: 'Male',
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
    const fullNameError = !this.state.fullName;
    const addressError = !this.state.address;
    const mobileError = !this.state.mobile || this.state.mobile.length !== 10;
    this.setState({ fullNameError, addressError, mobileError });

    if (fullNameError || addressError || mobileError) {
      return;
    }
    this.setState({ isLoading: true });
    const customer: Types.Customer = {
      value: this.state.fullName,
      address: this.state.address,
      mobile: this.state.mobile,
      gender: this.state.gender
    };

    await addCustomer(customer);
    Toast.show({
      text: Messages.customerAdded,
      position: 'bottom',
      type: 'success',
      buttonText: 'OK'
    });
    this.setState({
      fullNameError: '',
      addressError: '',
      mobileError: ''
    });
    this.fullNameInputField._root.clear();
    this.addressFieldInput._root.clear();
    this.mobileInput._root.clear();
    this.fullNameInputField._root.focus();
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
            {/* <View>
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
            </View> */}

            <Item error={this.state.fullNameError}>
              <Input
                placeholder="Full Name"
                ref={fullNameInputField => {
                  this.fullNameInputField = fullNameInputField;
                }}
                style={{flex: 1}}
                onChangeText={fullName => this.setState({ fullName })}
              />
              <Right>
                <Dropdown
                  label="Gender"
                  dropdownPosition={0}
                  labelFontSize={16}
                  value={this.state.gender}
                  data={[{ value: 'Male' }, { value: 'Female' }]}
                  containerStyle={{ width: 100, marginLeft: 10 }}
                  dropdownOffset={{ top: 20, left: 0 }}
                  onChangeText={gender => this.setState({ gender })}
                />
              </Right>
            </Item>

            <Item error={this.state.addressError}>
              <Textarea
                rowSpan={5}
                ref={addressFieldInput => {
                  this.addressFieldInput = addressFieldInput;
                }}
                placeholder="Address"
                style={[{ flex: 1, fontSize: 16 }]}
                onChangeText={address => this.setState({ address })}
              />
            </Item>

            <Item error={this.state.mobileError} last>
              <Input
                placeholder="Mobile"
                ref={mobileInput => {
                  this.mobileInput = mobileInput;
                }}
                keyboardType="number-pad"
                onChangeText={mobile => this.setState({ mobile })}
              />
            </Item>

            <CButton
              onPress={this.addCustomer}
              isLoading={this.state.isLoading}>
              SAVE
            </CButton>
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
    borderRadius: 10,
    borderColor: '#dddddd',
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    backfaceVisibility: 'hidden',
    ...getShadow()
  }
});

export default AddCustomer;
