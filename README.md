# EventPulse API

A backend API for an event booking and real-time announcement platform — think Eventbrite or Meetup. Built as a final project covering authentication, RESTful CRUD with advanced querying, event registration with capacity management, real-time announcements via Socket.io, input validation, automated testing, and cloud deployment.

## Tech Stack

- **Runtime & Framework:** Node.js, Express
- **Database:** MongoDB, Mongoose (hosted on MongoDB Atlas)
- **Authentication:** JWT (jsonwebtoken), bcryptjs
- **Real-time:** Socket.io
- **Validation:** express-validator
- **Testing:** Jest, Supertest
- **Documentation:** Swagger (swagger-jsdoc, swagger-ui-express), Postman
- **Deployment:** Vercel

## Local Installation

1. **Clone the repository**
```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**

   Create a `.env` file in the project root (see `.env.example` for the required keys):


## Environment Variables
| Variable  |               Example                      |           Description           |
| --------- |--------------------------------------------|-------------------------------- |
| PORT      | 5000                                       | Port used by the Express server |
| NODE_ENV  | development                                | Running Environment             |
| JWT_SECRET| mySecretKey | Token |
| JWT_EXPIRES_IN| 7d | How long before the JWT_SECRET expires |


4. **Seed the database** (optional, populates sample categories, events, and users)
```bash
   node seed.js
```

5. **Run the server**
```bash
   node app.js
```

6. **Run tests**
```bash
   npm test
```

## API Endpoints

**Authentication and Authorization**

| Method |       Endpoint       |       Description        |
|--------|----------------------|--------------------------|
| POST   | `/api/auth/register` | Register a new attendee  |
| POST   | `/api/auth/login`    | Log in and receive a JWT |

**Event Management**

| Method |           Endpoint            |                         Description                           |
|--------|-------------------------------|---------------------------------------------------------------|
| GET    | `/api/events`                 | List events (supports filtering, pagination, sorting, search) |
| GET    | `/api/events/:eventID`        | Get a single event, populated with category and organizer     |
| POST   | `/api/events`                 | Create a new event *(admin only)*                             |
| PATCH  | `/api/events/:eventID`        | Update an event *(admin only)*                                |
| DELETE | `/api/events/:eventID`        | Delete an event *(admin only)*                                |

**Registration Management**
| Method |           Endpoint            |                  Description                     |
|--------|-------------------------------|--------------------------------------------------|
| POST   | `/api/registrations`          | Register for an event                            |
| GET    | `/api/registrations/my`       | List the current user's registrations            |
| DELETE | `/api/registrations/:id`      | Cancel a registration                            |
| GET    | `/api/announcements/:eventId` | Get announcement history for an event            |
| POST   | `/api/announcements`          | Send a live announcement *(admin only)*          |
| GET    | `/health`                     | Health check — server uptime and database status |

## Real-Time Announcements

Admins can broadcast live announcements to attendees viewing a specific event via Socket.io. Clients join an event's room by emitting `join-event` with the event's ID, and receive live updates via the `announcement` event whenever an admin posts one through `POST /api/announcements`.

> **Note:** Socket.io requires a persistent connection, which is not fully supported by Vercel's serverless runtime. The real-time feature is fully implemented and tested locally; on the deployed instance, REST endpoints function normally, but live socket connections may not persist reliably due to this platform limitation.

## Live Deployment

https://final-project-7shymwtaz-perrymaro2010-pngs-projects.vercel.app — try `/health` and `/api-docs` once live.

## API Documentation

Interactive Swagger docs are available at `/api-docs` once the server is running (locally or deployed).

A Postman collection with example requests for every route is available in the `postman/` folder — import it along with the `EventPulse Dev` environment to get started quickly.