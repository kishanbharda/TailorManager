import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  Header,
  Left,
  Right,
  Content,
  Button,
  Title,
  Icon,
  Body,
  Item,
  Label,
  Input,
  Card,
  CardItem,
  Toast
} from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import CText from '../components/CText';
import CButton from '../components/CButton';
import { addCategory } from '../actions/category';
import * as Types from '../Types';
import Messages from '../../config/Messages';

class AddCategory extends Component {
  initialState = null;

  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      categoryNameError: '',
      gender: 'Male',
      sizes: [''],
      sizesError: '',
      isLoading: false
    };
    this.initialState = this.state;
  }

  onGenderChange = gender => {
    this.setState({ gender });
  };

  onCategoryChange = category => {
    this.setState({ category });
  };

  renderSize = ({ item, index }) => (
    <CardItem key={index.toString()}>
      <Item rounded>
        <Input
          style={{ fontSize: 18 }}
          value={this.state.sizes[index]}
          onChangeText={text => {
            const { sizes } = this.state;
            sizes[index] = text;
            this.setState({ sizes });
          }}
        />
        <Button
          disabled={this.state.sizes.length === 1}
          rounded
          danger
          style={{ margin: 5 }}
          onPress={() => this.deleteSize(index)}>
          <Icon name="trash" />
        </Button>
      </Item>
    </CardItem>
  );

  addSize = () => {
    const { sizes } = this.state;
    sizes.push('');
    this.setState({ sizes });
  };

  deleteSize = index => {
    const { sizes } = this.state;
    sizes.splice(index, 1);
    this.setState({ sizes });
  };

  saveCategory = async () => {
    const categoryNameError = !this.state.categoryName;
    const sizesError = this.state.sizes.find(item => item === '') !== undefined;

    this.setState({ categoryNameError, sizesError });
    if (categoryNameError) {
      return;
    }
    if (sizesError) {
      Toast.show({
        text: 'Size cannot be empty',
        buttonText: 'OK',
        type: 'danger'
      });
      return;
    }
    this.setState({ isLoading: true });
    const category: Types.Category = {
      gender: this.state.gender,
      value: this.state.categoryName,
      sizes: this.state.sizes
    };
    await addCategory(category);
    Toast.show({
      text: Messages.categoryAdded,
      position: 'bottom',
      type: 'success',
      buttonText: 'OK'
    });
    this.setState({
      sizes: [''],
      gender: this.initialState.gender,
      categoryName: '',
      isLoading: false
    });
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
        <Content padder>
          <Card>
            <CardItem>
              <Item floatingLabel error={this.state.categoryNameError}>
                <Label>Category Name</Label>
                <Input
                  value={this.state.categoryName}
                  onChangeText={categoryName => this.setState({ categoryName })}
                />
              </Item>
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
            </CardItem>
            <CardItem header>
              <Label>Sizes</Label>
            </CardItem>
            <FlatList
              data={this.state.sizes}
              extraData={this.state}
              renderItem={this.renderSize}
            />
            <CardItem footer>
              <CButton style={{ flex: 1 }} onPress={this.addSize}>
                ADD
              </CButton>
            </CardItem>
          </Card>
          <CButton
            style={{ flex: 1 }}
            color="#008811"
            onPress={this.saveCategory}
            isLoading={this.state.isLoading}>
            SAVE
          </CButton>
        </Content>
      </Container>
    );
  }
}

export default AddCategory;
