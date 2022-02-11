import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import App from '../App';
import { mockData } from '../mock-data';
import { mount, shallow } from 'enzyme';
import Event from '../Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('user hasn’t clicked on any event', () => {

    });
    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('the details of events will be collapsed', () => {
      expect(AppWrapper.find(".details-view")).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppWrapper;
    given('user wants to know more about an event', () => {
      AppWrapper = mount(<App />);
    });

    when('the user clicks on an event', () => {
      AppWrapper.update();
      AppWrapper.find(".show-details").at(0).simulate("click");
    });

    then('the details of the event expand', () => {
      expect(AppWrapper.find(".details-view")).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let EventWrapper;
    given('user doesn’t want to see the details of a specific event anymore', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.setState({ collapsed: false });
    });

    when('the user clicks on a hide details button on the expanded event', () => {
      EventWrapper.find(".hide-details").simulate("click");
    });

    then('the event details will return to their default collapsed position', () => {
      expect(EventWrapper.find(".details-view")).toHaveLength(0);
    });
  });
});