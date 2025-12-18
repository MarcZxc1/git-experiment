# Enterprise Task Management System

A full-stack web application for managing tasks, projects, and team collaboration.

## Tech Stack

### Backend
- Node.js + Express
- MongoDB (with Mongoose)
- JWT Authentication
- RESTful API

### Frontend
- React 18
- TypeScript
- Material-UI
- React Router
- Axios

## Project Structure

```
enterprise-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.jsx
│   ├── package.json
│   └── public/
└── docs/
    └── git-exercises.md
```

## Getting Started

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Features

- User Authentication & Authorization
- Task Management
- Project Management
- Team Collaboration
- Real-time Updates
- Dashboard & Analytics

## Git Exercises

This project includes comprehensive Git exercises specifically designed for full-stack development. See `docs/git-exercises.md` for 15 detailed exercises covering:

- Feature branch development
- Backend/Frontend coordination
- Merge strategies and conflict resolution
- Hotfix and release workflows
- Code review processes
- Database migrations
- API versioning
- And much more!

**Quick Start:** See `QUICK_START.md` to begin practicing Git workflows with this enterprise application.

