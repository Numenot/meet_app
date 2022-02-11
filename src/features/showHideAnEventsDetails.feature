Feature: Show/hide event details

Scenario: An event element is collapsed by default
Given user hasn’t clicked on any event
When the user opens the app
Then the details of events will be collapsed

Scenario: User can expand an event to see its details
Given user wants to know more about an event
When the user clicks on an event
Then the details of the event expand

Scenario: User can collapse an event to hide its details
Given user doesn’t want to see the details of a specific event anymore
When the user clicks on a hide details button on the expanded event
Then the event details will return to their default collapsed position