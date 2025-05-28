# Event Management API

A simple Node.js + Express backend for user authentication, event creation, and event registration with capacity constraints.

---

## Features

- User Signup, Login, Logout
- Create and List Events
- Register for Events with Capacity Enforcement
- Cancel Event Registrations
- MongoDB-based data persistence
- Secure endpoints with token-based auth

---

## Tech Stack

- **Node.js**
- **Express**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **Helmet** for security
- **CORS** & **Cookie Parser**


## AUTH APIs

POST /signup — Register a new user

POST /login — Login user and return token

DELETE /signout — Logout user

## EVENT APIs

GET /events — Get list of all events

POST /events — Create a new event

## REGISTRATION APIs

POST /events/:id/register — Register for an event

DELETE /events/:id/register — Cancel event registration



How to Use the API with Postman
 1. Authentication Flow

### Signup
Method: POST
URL: http://localhost:3000/signup
Body (in JSON format):
<br>
{<br>
  "email": "john@example.com",<br>
  "password": "yourpassword"<br>
}<br>



### Login
Method: POST

URL: http://localhost:3000/login
<br>
{<br>
  "email": "john@example.com",<br>
  "password": "yourpassword"<br>
}<br>

Response: Returns a JWT token. Copy this token for use in later requests.

### signout
Method: DELETE (Requires Auth)

URL: http://localhost:3000/signout

Headers:

authorization: <your_token>
Response: Message of successfully logout and removes auth token from cookies.

In Postman, go to the "Header" tab, add key "authorization" and in value paste the copied token.

2. Event Management
### Create Event (Requires Auth)
Method: POST

URL: http://localhost:3000/events

Headers:

authorization: <your_token>

Body<br>
{<br>
  "name": "Tech Conference",<br>
  "description": "Annual tech meetup",<br>
  "date": "2025-06-15",<br>
  "location": "Bengaluru",<br>
  "capacity": 100<br>
}<br>


### List All Events
Method: GET

URL: http://localhost:3000/events

### Register for Event (Requires Auth)
Method: POST

URL: http://localhost:3000/events/<event_id>/register

Headers:

authorization: <your_token>

### Cancel Registration (Requires Auth)
Method: DELETE

URL: http://localhost:3000/events/<event_id>/register

Headers:

authorization: <your_token>




## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/pnkjkr21/event-management.git
cd event-management

## Install Dependencies

1. Install Node.js and npm
If you don't already have Node.js and npm installed, you can download and install them from the official website:

https://nodejs.org/

This will install both node and npm (Node Package Manager) globally on your system.

npm install

2. Start the server
You can start the server in either of the following ways:
- node index.js
- nodemon
- npm start
