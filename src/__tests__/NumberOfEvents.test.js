import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

  let NumberOfEventsWrapper;

  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />)
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1);
  });

  test('change state when text input changes', () => {
    NumberOfEventsWrapper.setState({
      value: '10'
    });
    const eventObject = { target: { value: '20' } };
    NumberOfEventsWrapper.find('.events-input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('value')).toEqual('20');
  });

})


