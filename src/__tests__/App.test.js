import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render number of events', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

//Integration testing

describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user clicks on see all cities', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  })

  test('The number of events loaded by default is 32', async () => {
    const AppWrapper = mount(<App />);
    expect(AppWrapper.state('numberOfEvents')).toBe('32');
    AppWrapper.unmount();
  })

  test('The state of numberOfEvents changes when number input changes', async () => {
    const AppWrapper = mount(<App />);
    const numberInput = AppWrapper.find(NumberOfEvents).find('.events-input');
    const eventObject = { target: { value: '10' } };
    numberInput.at(0).simulate('change', eventObject);
    expect(AppWrapper.state('numberOfEvents')).toBe('10');
    AppWrapper.unmount();
  })

  test('When the number of events input field is updated, the number of events displayed updates too', async () => {
    const AppWrapper = mount(<App />);
    const numberInput = AppWrapper.find(NumberOfEvents).find('.events-input');
    const eventObject = { target: { value: '1' } };
    await numberInput.at(0).simulate('change', eventObject);
    expect(AppWrapper.state('events')).toHaveLength(1);
    AppWrapper.update();
    expect(AppWrapper.find('.event')).toHaveLength(1);
    expect(AppWrapper.find(EventList).props().events).toHaveLength(1);
    AppWrapper.unmount();
  })

  test('When the number of events is set to a number below 1, an error alert is displayed', async () => {
    const AppWrapper = mount(<App />);
    const numberInput = AppWrapper.find(NumberOfEvents).find('.events-input');
    const eventObject = { target: { value: '0' } };
    numberInput.at(0).simulate('change', eventObject);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    expect(NumberOfEventsWrapper.state('errorText')).toBe('Please select a number between 1 and 32');
    AppWrapper.unmount();
  })

  test('When the number of events is set to a number above 32, an error alert is displayed', async () => {
    const AppWrapper = mount(<App />);
    const numberInput = AppWrapper.find(NumberOfEvents).find('.events-input');
    const eventObject = { target: { value: '33' } };
    numberInput.at(0).simulate('change', eventObject);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    expect(NumberOfEventsWrapper.state('errorText')).toBe('Please select a number between 1 and 32');
    AppWrapper.unmount();
  })

});