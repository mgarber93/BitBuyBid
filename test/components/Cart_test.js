import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import CartItem from '../../src/components/CartItem.jsx';
import Cart from '../../src/views/Cart.jsx';
import configureStore from '../../src/store/index.js';

import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore(window.__PRELOADED_STATE__, window);

describe('Cart', () => {
  const setup = () => {
    const wrapper = mount(<MuiThemeProvider><Provider store={store}><Cart/></Provider></MuiThemeProvider>);

    return {
      wrapper,
    };
  };
  const { wrapper } = setup();

  it('Renders something', () => {
    expect(wrapper).to.exist;
  });
  it('Nested Switch component Renders', () => {
    expect(wrapper.find('Switch').length).to.equal(1);
  });
  // it('Route components render', () => {
  //   expect(wrapper.find('Route').length).to.equal(4);
  // });
});