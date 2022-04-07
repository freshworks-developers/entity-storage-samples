# Freshservice custom objects data-sync app (WIP)

This app syncs employee data from Freshteam and stores that data in Freshservice using Custom Objects.

When an agent views a ticket, this app tries to lookup employee data from the entity store using the requester email address, or by trying to identify employee ID from the subject line. If it fails to auto-identify, it shows the agent a text field to type in either email or employee ID to lookup an employee.

A scheduled function syncs list of employees using the Freshteam API on an interval, and updates the entity store.