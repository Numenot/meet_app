import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    value: ''
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      value: value
    });
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
          value={this.state.value}
        />
      </div>
    );
  }
}

export default NumberOfEvents;