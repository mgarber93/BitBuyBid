import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import ProfilePicture from '../../src/components/ProfilePicture.jsx';

import configureStore from '../../src/store/index.js';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore(window.__PRELOADED_STATE__, window);


describe('ProfilePicture', () => {
  const setup = () => {
    const wrapper = mount(<MuiThemeProvider><Provider store={store}><ProfilePicture /></Provider></MuiThemeProvider>);

    return {
      wrapper,
    };
  };
  const { wrapper } = setup();
  // console.log(wrapper);
  it('renders something', () => {
    expect(wrapper).to.exist;
  });
  it('Card component renders', () => {
    expect(wrapper.find('Card').length).to.equal(1);
  });
  // it('BrowserRouter renders', () => {
  //   expect(wrapper.find('BrowserRouter').length).to.equal(1);
  // });
});

