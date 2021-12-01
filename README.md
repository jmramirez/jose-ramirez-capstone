# PartyAgile

The main objective of this application is to help organize events by keeping track of deadlines and staying in communication with all vendors and parties involved.

## User Profile

There are two kinds of users, or roles defined for this application, the main user who would be the **`Event Planner`**, which can create and modify events, assign vendors to the events, and communicate with them any time.

The second role will be **`Vendors`**, or service providers which can review events, add payments to the events they are assigned to, and communicate with event planners.


## Tech Stack

**`Server Side:`** .NET version 5.0, with C#. The web API is developed using a multilayer architecture, including Data Access, necessary to store all the information in a database, Data Model which is the representation of the data handled by the API, and HTTP Layer which included all the action methods necessary to handle requests and responses.

**`Database:`** Microsoft SQL Server

**`Client Side:`** React.js, SASS

**`Authentication:`** ASP.NET Identity, JWT

**`Libraries:`** Microsoft Entity Framework as ORM, SignalR which is a library for .NET that allows server-side code to push content to connected clients.

## How To Run

There are Demo users created, you can log in as a **`Demo Planner`** or **`Demo Vendor`**, once you enter, you can browse, check the event created, create new events, add vendors, and try the Chat windows. As a vendor, you can chat with the planner, and add payment.

### Link to App: [https://www.partyagile.com](https://www.partyagile.com) 


