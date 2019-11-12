import React, { Component } from 'react';
import { Root } from 'native-base';
import Router from './Router';

class App extends Component {
  render() {
    return (
      <Root>
        <Router />
      </Root>
    );
  }
}

export default App;
