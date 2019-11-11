import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import Home from './src/containers/Home';
import AddItem from './src/containers/AddItem';
import AddCustomer from './src/containers/AddCustomer';
import AddCategory from './src/containers/AddCategory';

const AddItemStackNavigator = createStackNavigator(
  {
    AddItem: {
      screen: AddItem
    },
    AddCustomer: {
      screen: AddCustomer
    },
    AddCategory: {
      screen: AddCategory
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home
  },
  AddItem: {
    screen: AddItemStackNavigator,
    navigationOptions: {
      drawerLabel: 'Add Item'
    }
  },
  AddCustomer: {
    screen: AddCustomer,
    navigationOptions: {
      drawerLabel: 'Add Customer'
    }
  },
  AddCategory: {
    screen: AddCategory,
    navigationOptions: {
      drawerLabel: 'Add Category'
    }
  }
});

const AppContainer = createAppContainer(DrawerNavigator);

const Router = AppContainer;

export default Router;
