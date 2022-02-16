import React, { Component } from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { OfflineWarningAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: '32',
    location: 'all'
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events)
        });
      }
    });
    if (!navigator.onLine) {
      this.setState({
        OfflineWarningAlertText: 'You are not currently online, the events information displayed might not be up to date'
      });
    } else {
      this.setState({
        OfflineWarningAlertText: ''
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location = 'all', eventCount = this.state.numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events.slice(0, eventCount) :
        events.filter((event) => event.location === location).slice(0, eventCount);

      this.setState({
        events: locationEvents.slice(0, eventCount),
        location
      });
    });
  }

  updateNumberOfEvents = (number) => {
    const newEventCount = number;
    this.setState({
      numberOfEvents: newEventCount
    });
    this.updateEvents(this.state.location, newEventCount);
  };

  render() {
    const { events, locations, numberOfEvents, OfflineWarningAlertText } = this.state;
    return (
      <div className="App">
        <OfflineWarningAlert text={OfflineWarningAlertText} />
        <h1>Welcome to Meet</h1>
        <h4>Select a city near you:</h4>
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <br />
        <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
        <EventList events={events} />
      </div >
    );
  }
}

export default App;
