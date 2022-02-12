import React, { Component } from "react";

class Event extends Component {

  state = {
    collapsed: true
  };

  handleClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;

    return (
      <div className='event'>
        <div className='event_name'>
          {event.summary}
        </div>
        <div className="event_start-date">
          {event.start.dateTime} ({event.start.timeZone})
        </div>
        <div className='event_location'>
          @{event.summary} | {event.location}
        </div>
        <button
          className={`details-btn ${collapsed ? "show" : "hide"}-details`}
          onClick={this.handleClick}>{collapsed ? "Show Details" : "Hide Details"}
        </button>

        {!collapsed && (
          <div className="details-view">
            <div className="details-header">
              About event:
            </div>
            <a href={event.htmlLink} className='details-link' target='_blank'>See details on Google Calendar</a>
            <div className='description'>
              {event.description}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Event;