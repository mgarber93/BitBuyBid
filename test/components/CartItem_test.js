import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import CartItem from '../../src/components/CartItem.jsx';

import configureStore from '../../src/store/index.js';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore(window.__PRELOADED_STATE__, window);

var item = {
  id: 38,
  prod_id: "108871731461846856|OVSOCK",
  asin: null,
  sku: "1461846856",
  upc: null,
  catalog_id: "1438",
  price: "20.00",
  buy_url: "http://www.dpbolvw.net/click-8425112-10887173-1409216810936?url=http%3A%2F%2Fwww.aliexpress.com%2Fitem%2FFree-shipping-Bluetooth-2-4-GHz-Wireless-Mouse-for-Apple-Macbook-iMac-Windows-7-vista-XP%2F1461846856.html&cjsku=1461846856",
  img_url_sm: "http://img.alibaba.com/wsphoto/v2/1461846856_1/Free-shipping-Bluetooth-2-4-GHz-Wireless-Mouse-for-Apple-Macbook-iMac-Windows-7-vista-XP.summ.jpg",
  img_url_md: "http://img.alibaba.com/wsphoto/v2/1461846856_1/Free-shipping-Bluetooth-2-4-GHz-Wireless-Mouse-for-Apple-Macbook-iMac-Windows-7-vista-XP.summ.jpg",
  img_url_lg: "http://img.alibaba.com/wsphoto/v2/1461846856_1/Free-shipping-Bluetooth-2-4-GHz-Wireless-Mouse-for-Apple-Macbook-iMac-Windows-7-vista-XP.summ.jpg",
  type: "ovsock",
  title: 'Title!',
  description: "Free shipping Bluetooth 2.4 GHz Wireless Mouse for Apple Macbook iMac Windows 7 vista XP Laptop PC",
  user_id: null,
  category_id: null,
  created_at: "2017-09-15T18:51:18.679Z",
  updated_at: "2017-09-15T18:51:18.679Z"
};


describe('CartItem', () => {
  const setup = () => {
    const wrapper = mount(<MuiThemeProvider><Provider store={store}><CartItem item={item}/></Provider></MuiThemeProvider>);

    return {
      wrapper,
    };
  };
  const { wrapper } = setup();
  
  it('Renders something', () => {
    expect(wrapper).to.exist;
  });
  it('Buttons render', () => {
    expect(wrapper.find('button').length).to.equal(3);
  });
  it('Correct text appears in buttons', () => {
    expect(wrapper.find('button').first().text()).to.equal('+');
    expect(wrapper.find('button').at(1).text()).to.equal('-');
    expect(wrapper.find('button').at(2).text()).to.equal('Remove from Cart');
  });
  // it('Buttons have access to cart functions', () => {
  //   expect(wrapper.props().addToCart).to.exist;
  // });
  it('H4 renders', () => {
    expect(wrapper.find('h4').length).to.equal(1);
  });
  it('Correct text appears in h4', () => {
    expect(wrapper.find('h4').text()).to.equal('Title!');
  });
});