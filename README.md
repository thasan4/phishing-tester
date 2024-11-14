# Phishing Simulation Project

A full-stack application for simulating and tracking phishing attempts using NestJS and React.

## Project Structure
```
├── apps/
│   ├── api/         # NestJS backend
│   └── web/         # React frontend
└── docker/          # Docker volumes
```

## Prerequisites
- Node.js 20.x
- Docker and Docker Compose
- npm

## Environment Variables

### Backend (.env in apps/api/)
You can copy the `.env.example` file to `.env` and modify the values as needed.
```sh
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_INITDB_ROOT_USERNAME=root 
MONGO_INITDB_ROOT_PASSWORD=rootRoot
MONGO_INITDB_DATABASE=phishing
JWT_SECRET=secret
JWT_TTL=1d
HASH_SALT=qwerty
SMTP_HOST=app.debugmail.io
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-pass
SMTP_PORT=25
FROM_EMAIL=test@my-app.com
BACKEND_URL=http://localhost:3000
```

### Frontend (.env.development and .env.production in apps/web/)
```sh
VITE_API_URL=http://localhost:3000/api
```

## Development Setup

1. Install dependencies:
```sh
npm install
```

2. Start development servers:
```sh
npm run dev
```

This will start:
- API server at http://localhost:3000
- Web client at http://localhost:5173

## Docker Setup

Start all services using Docker Compose:

```sh
docker-compose up -d
```

This will start:
- API server at http://localhost:3000
- Web client at http://localhost:8080
- MongoDB at localhost:27017

## Available Scripts

- `npm run dev` - Start development servers
- `npm run build` - Build all applications

## Technologies Used

- Backend:
  - NestJS
  - MongoDB
  - JWT Authentication
  - NodeMailer

- Frontend:
  - React
  - Material UI
  - Vite
  - TypeScript