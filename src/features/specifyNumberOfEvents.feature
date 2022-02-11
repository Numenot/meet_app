Feature: Specify number of events

Scenario: When user hasn’t specified a number, 32 is the default number
Given a user has not specified how many events they wish to view on one page
When the user opens the app
Then user will see a set number of events by default

Scenario: User can change the number of events they want to see
Given the user wants to change the number of events they view on a page
When they click on the dropdown or text field for number of events per page
Then they can change the number of events they can view on a page at once
