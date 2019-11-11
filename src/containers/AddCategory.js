import React, { Component } from 'react';
import { Dimensions } from 'react-native';
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

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      category: ''
    };
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
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" type="Ionicons" />
            </Button>
          </Left>
          <Body>
            <Title>Add Category</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Full Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Address</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Mobile</Label>
              <Input />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default AddCategory;
