# Freshfoods - Sample app for Custom Objects

This app presents a full case study of using Freshdesk to gather delivery requests and see them in a dashboard. It stores all data using Custom Objects.

This app is broadly divided into:

- a serverless component that creates new records by listening to `onTicketCreate` event
- a sidebar frontend component that renders the location of the current ticket
- a full page app component that shows an interactive dashboard