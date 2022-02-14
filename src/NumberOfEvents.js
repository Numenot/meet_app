import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    eventCount: '32',
    errorText: ''
  }

  handleInputChanged = (event) => {
    let value = event.target.value;
    if (value >= 1 && value <= 32) {
      this.setState({
        eventCount: value,
        errorText: ''
      });
      this.props.updateNumberOfEvents(event.target.value);
    }
    else (
      this.setState({
        eventCount: value,
        errorText: 'Please select a number between 1 and 32'
      })
    )
  };

  render() {
    return (
      <div className='NumberOfEvents'>
        <label htmlFor='event-number'>Number of events: </label>
        <ErrorAlert text={this.state.errorText} />
        <input
          name='event-number'
          type='number'
          className='events-input'
          onChange={this.handleInputChanged}
          value={this.state.eventCount}
        />
      </div>
    );
  }
}

export default NumberOfEvents;