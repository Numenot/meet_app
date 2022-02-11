import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import App from '../App';
import { mount } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    given('a user has not specified how many events they wish to view on one page', () => {

    });
    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('user will see a set number of events by default', () => {
      expect(AppWrapper.state('numberOfEvents')).toBe("32");
    });
  });
  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    given('the user wants to change the number of events they view on a page', () => {
      AppWrapper = mount(<App />);
    });

    when('they click on the dropdown or text field for number of events per page', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      const newEventCount = { target: { value: 16 } }
      NumberOfEventsWrapper.find("input").simulate("change", newEventCount);
    });

    then('they can change the number of events they can view on a page at once', () => {
      expect(AppWrapper.state("numberOfEvents")).toEqual(16);
    });
  });
});