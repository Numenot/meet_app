import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventCount: '32'
  }

  handleInputChanged = (event) => {
    let value = event.target.value;
    this.setState({
      eventCount: value
    });
    this.props.updateNumberOfEvents(event.target.value);
  };

  render() {
    return (
      <div className='NumberOfEvents'>
        <label htmlFor='event-number'>Number of events: </label>
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