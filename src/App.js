import React, { Component } from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { OfflineWarningAlert } from './Alert';
import EventGenre from './EventGenre';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: '32',
    location: 'all',
    OfflineWarningAlertText: ''
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

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
        <div className="meet-header">
          <h1>Welcome to Meet</h1>
          <h4>Select a city near you:</h4>
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
          <br />
          <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
          <br />
        </div>
        <h4> Breakdown of future events:</h4>
        <div className="data-vis-wrapper">
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
          <EventGenre events={events} />
        </div>
        <EventList events={events} />
      </div >
    );
  }
}

export default App;
