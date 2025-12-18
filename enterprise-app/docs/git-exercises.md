# Git Exercises for Full-Stack Web Application Development

This comprehensive guide provides hands-on Git exercises specifically designed for developing a full-stack web application. Follow these exercises to master Git workflows in a real-world enterprise development scenario.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Exercise 1: Initial Setup and Repository Structure](#exercise-1-initial-setup-and-repository-structure)
3. [Exercise 2: Feature Branch Development](#exercise-2-feature-branch-development)
4. [Exercise 3: Backend and Frontend Coordination](#exercise-3-backend-and-frontend-coordination)
5. [Exercise 4: Merging Features](#exercise-4-merging-features)
6. [Exercise 5: Conflict Resolution in Full-Stack](#exercise-5-conflict-resolution-in-full-stack)
7. [Exercise 6: Hotfix Workflow](#exercise-6-hotfix-workflow)
8. [Exercise 7: Release Management](#exercise-7-release-management)
9. [Exercise 8: Collaborative Development](#exercise-8-collaborative-development)
10. [Exercise 9: Code Review and Pull Requests](#exercise-9-code-review-and-pull-requests)
11. [Exercise 10: Database Migration Management](#exercise-10-database-migration-management)
12. [Exercise 11: API Versioning](#exercise-11-api-versioning)
13. [Exercise 12: Frontend Feature Flags](#exercise-12-frontend-feature-flags)
14. [Exercise 13: Deployment Branches](#exercise-13-deployment-branches)
15. [Exercise 14: Rollback Strategies](#exercise-14-rollback-strategies)
16. [Exercise 15: Full Development Cycle](#exercise-15-full-development-cycle)

---

## Project Overview

**Enterprise Task Management System** - A full-stack application with:
- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + Material-UI
- **Features**: Authentication, Tasks, Projects, Users, Analytics, Notifications, File Upload

**Current Branches:**
- `main` - Production-ready code
- `feature/notifications` - Notification system
- `feature/analytics` - Analytics dashboard
- `feature/file-upload` - File upload functionality
- `bugfix/auth-token-expiry` - Authentication bug fix

---

## Exercise 1: Initial Setup and Repository Structure

**Goal:** Understand the repository structure and initial state.

### Step 1: Explore the Repository

```bash
cd enterprise-app
git log --oneline --graph --all
```

**Expected Output:**
```
* 2d3b631 feat: Add file upload functionality
* adc04d3 chore: Add API configuration file
| * 9f9fe69 feat: Add analytics dashboard API
|/  
| * c74a8e3 feat: Add notification system backend
|/  
* 1597882 Initial commit: Full-stack enterprise application setup
```

### Step 2: View Branch Structure

```bash
git branch -a
```

**Expected Output:**
```
  bugfix/auth-token-expiry
  feature/analytics
  feature/file-upload
  feature/notifications
* main
```

### Step 3: Understand Project Structure

```bash
tree -L 2 -I 'node_modules'
```

**What to Notice:**
- Separate `backend/` and `frontend/` directories
- Each has its own `package.json`
- Shared `.gitignore` at root level
- Feature branches contain backend OR frontend changes

---

## Exercise 2: Feature Branch Development

**Goal:** Develop a new feature using proper Git workflow.

### Scenario: Add Real-time Chat Feature

**Step 1: Create Feature Branch**

```bash
git checkout main
git pull origin main  # (if you have remote)
git checkout -b feature/real-time-chat
```

**Step 2: Develop Backend First**

```bash
# Create WebSocket server file
cat > backend/src/services/websocket.js << 'EOF'
const WebSocket = require('ws');

class WebSocketService {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Map();
    this.setup();
  }

  setup() {
    this.wss.on('connection', (ws, req) => {
      const userId = this.extractUserId(req);
      this.clients.set(userId, ws);
      
      ws.on('message', (message) => {
        this.handleMessage(userId, message);
      });
      
      ws.on('close', () => {
        this.clients.delete(userId);
      });
    });
  }

  extractUserId(req) {
    // Extract from auth token
    return req.headers['user-id'] || 'anonymous';
  }

  handleMessage(userId, message) {
    const data = JSON.parse(message);
    this.broadcast(userId, data);
  }

  broadcast(senderId, data) {
    this.clients.forEach((client, userId) => {
      if (userId !== senderId && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}

module.exports = WebSocketService;
EOF

git add backend/src/services/websocket.js
git commit -m "feat(backend): Add WebSocket service for real-time chat"
```

**Step 3: Integrate with Server**

```bash
# Update server.js
# Add: const WebSocketService = require('./services/websocket');
# Add: const wsService = new WebSocketService(server);

git add backend/src/server.js
git commit -m "feat(backend): Integrate WebSocket service with Express server"
```

**Step 4: Develop Frontend**

```bash
# Create chat component
cat > frontend/src/components/Chat.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:5000');
    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };
    setWs(websocket);
    return () => websocket.close();
  }, []);

  const sendMessage = () => {
    if (ws && input.trim()) {
      ws.send(JSON.stringify({ text: input, timestamp: Date.now() }));
      setInput('');
    }
  };

  return (
    <Paper sx={{ p: 2, height: '500px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>Chat</Typography>
      <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
        {messages.map((msg, idx) => (
          <Typography key={idx}>{msg.text}</Typography>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button variant="contained" onClick={sendMessage}>Send</Button>
      </Box>
    </Paper>
  );
}
EOF

git add frontend/src/components/Chat.jsx
git commit -m "feat(frontend): Add real-time chat component"
```

**Step 5: View Your Work**

```bash
git log --oneline --graph
```

**Expected Output:**
```
* abc1234 feat(frontend): Add real-time chat component
* def5678 feat(backend): Integrate WebSocket service with Express server
* ghi9012 feat(backend): Add WebSocket service for real-time chat
* 1597882 Initial commit: Full-stack enterprise application setup
```

---

## Exercise 3: Backend and Frontend Coordination

**Goal:** Learn to coordinate backend API changes with frontend updates.

### Scenario: Update Task API and Frontend

**Step 1: Start from Main**

```bash
git checkout main
git checkout -b feature/task-comments
```

**Step 2: Update Backend Model**

```bash
# Add comments field to Task model
# Edit: backend/src/models/Task.js
# Add to schema:
# comments: [{
#   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
#   text: String,
#   createdAt: { type: Date, default: Date.now }
# }]

git add backend/src/models/Task.js
git commit -m "feat(backend): Add comments field to Task model"
```

**Step 3: Update Backend API**

```bash
# Add comment endpoint to tasks route
# Edit: backend/src/routes/tasks.js
# Add: router.post('/:id/comments', protect, async (req, res) => { ... })

git add backend/src/routes/tasks.js
git commit -m "feat(backend): Add comment endpoint to tasks API"
```

**Step 4: Update Frontend Service**

```bash
# Add comment method to API service
# Edit: frontend/src/services/api.js or create tasks.js
# Add: export const addTaskComment = (taskId, comment) => api.post(`/tasks/${taskId}/comments`, { text: comment });

git add frontend/src/services/
git commit -m "feat(frontend): Add task comment API service method"
```

**Step 5: Update Frontend Component**

```bash
# Update Tasks page to show and add comments
# Edit: frontend/src/pages/Tasks.jsx

git add frontend/src/pages/Tasks.jsx
git commit -m "feat(frontend): Add comment UI to tasks page"
```

**Step 6: View Coordinated Changes**

```bash
git log --oneline
```

**Notice:** Each commit focuses on one layer (backend model → backend API → frontend service → frontend UI)

---

## Exercise 4: Merging Features

**Goal:** Merge feature branches into main with proper testing.

### Merge Notifications Feature

**Step 1: Review Feature Branch**

```bash
git checkout feature/notifications
git log --oneline
```

**Step 2: Test the Feature**

```bash
# Review the changes
git diff main

# Check what files were changed
git diff --name-only main
```

**Step 3: Merge to Main**

```bash
git checkout main
git merge feature/notifications --no-ff -m "Merge feature/notifications: Add notification system"
```

**Expected Output:**
```
Merge made by the 'recursive' strategy.
 backend/src/models/Notification.js | 25 +
 backend/src/routes/notifications.js | 72 +
 2 files changed, 97 insertions(+)
```

**Step 4: Update Server Routes**

```bash
# Edit backend/src/server.js
# Add: app.use('/api/notifications', require('./routes/notifications'));

git add backend/src/server.js
git commit -m "chore: Register notifications route in server"
```

**Step 5: Verify Merge**

```bash
git log --oneline --graph
```

---

## Exercise 5: Conflict Resolution in Full-Stack

**Goal:** Resolve conflicts when multiple developers modify the same files.

### Create Conflict Scenario

**Step 1: Developer A modifies server.js on main**

```bash
git checkout main
# Edit backend/src/server.js
# Change: app.use(morgan('dev')); to app.use(morgan('combined'));

git add backend/src/server.js
git commit -m "chore: Update morgan logging format"
```

**Step 2: Developer B modifies server.js on feature branch**

```bash
git checkout -b feature/request-logging
# Edit backend/src/server.js
# Add: app.use((req, res, next) => { console.log(`${req.method} ${req.path}`); next(); });

git add backend/src/server.js
git commit -m "feat: Add custom request logging middleware"
```

**Step 3: Attempt Merge (Creates Conflict)**

```bash
git checkout main
git merge feature/request-logging
```

**Expected Output:**
```
Auto-merging backend/src/server.js
CONFLICT (content): Merge conflict in backend/src/server.js
Automatic merge failed; fix conflicts and then commit the result.
```

**Step 4: View Conflict**

```bash
cat backend/src/server.js
```

**You'll see:**
```javascript
<<<<<<< HEAD
app.use(morgan('combined'));
=======
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
>>>>>>> feature/request-logging
```

**Step 5: Resolve Conflict**

Edit `backend/src/server.js` to combine both changes:
```javascript
app.use(morgan('combined'));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

**Step 6: Complete Merge**

```bash
git add backend/src/server.js
git commit -m "Merge feature/request-logging: Add custom logging with updated morgan format"
```

---

## Exercise 6: Hotfix Workflow

**Goal:** Fix critical production bugs quickly.

### Scenario: Security Vulnerability in Authentication

**Step 1: Create Hotfix Branch from Main**

```bash
git checkout main
git checkout -b hotfix/auth-security-patch
```

**Step 2: Fix the Issue**

```bash
# Edit backend/src/routes/auth.js
# Add rate limiting and input validation

git add backend/src/routes/auth.js
git commit -m "fix: Add rate limiting and input validation to auth routes"
```

**Step 3: Update Tests**

```bash
# Add security tests
# Edit: backend/tests/auth.test.js

git add backend/tests/auth.test.js
git commit -m "test: Add security tests for authentication"
```

**Step 4: Merge to Main**

```bash
git checkout main
git merge hotfix/auth-security-patch --no-ff -m "Merge hotfix: Security patch for authentication"
```

**Step 5: Tag Release**

```bash
git tag -a v1.0.1 -m "Security patch: Authentication rate limiting"
```

**Step 6: Clean Up**

```bash
git branch -d hotfix/auth-security-patch
```

---

## Exercise 7: Release Management

**Goal:** Prepare and manage releases for production.

### Create Release Branch

**Step 1: Create Release Branch**

```bash
git checkout main
git checkout -b release/v1.1.0
```

**Step 2: Update Version Numbers**

```bash
# Update backend/package.json version to 1.1.0
# Update frontend/package.json version to 1.1.0

git add backend/package.json frontend/package.json
git commit -m "chore: Bump version to 1.1.0"
```

**Step 3: Update Changelog**

```bash
# Create or update CHANGELOG.md
cat >> CHANGELOG.md << 'EOF'

## [1.1.0] - 2024-01-15

### Added
- Notification system
- Analytics dashboard
- File upload functionality

### Fixed
- Authentication token expiry handling
EOF

git add CHANGELOG.md
git commit -m "docs: Update changelog for v1.1.0"
```

**Step 4: Final Testing**

```bash
# Run tests (if you have them)
# npm test

# Build frontend
cd frontend && npm run build && cd ..
```

**Step 5: Merge to Main and Tag**

```bash
git checkout main
git merge release/v1.1.0 --no-ff -m "Release v1.1.0"
git tag -a v1.1.0 -m "Release version 1.1.0"
```

**Step 6: Clean Up**

```bash
git branch -d release/v1.1.0
```

---

## Exercise 8: Collaborative Development

**Goal:** Simulate multiple developers working on the same project.

### Scenario: Two Developers Working on Different Features

**Developer A: Dashboard Improvements**

```bash
git checkout main
git checkout -b feature/dashboard-improvements

# Add new dashboard widgets
# Edit: frontend/src/pages/Dashboard.jsx

git add frontend/src/pages/Dashboard.jsx
git commit -m "feat(frontend): Add new dashboard widgets"
```

**Developer B: API Performance Optimization**

```bash
git checkout main
git checkout -b feature/api-optimization

# Add caching middleware
# Create: backend/src/middleware/cache.js

git add backend/src/middleware/cache.js
git commit -m "feat(backend): Add API response caching"
```

**Developer A: Push and Create PR**

```bash
git push origin feature/dashboard-improvements
# Create Pull Request on GitHub/GitLab
```

**Developer B: Push and Create PR**

```bash
git push origin feature/api-optimization
# Create Pull Request on GitHub/GitLab
```

**Merge Developer A's PR First**

```bash
git checkout main
git merge feature/dashboard-improvements
git push origin main
```

**Developer B: Update Branch**

```bash
git checkout feature/api-optimization
git rebase main  # or git merge main
# Resolve any conflicts
git push origin feature/api-optimization --force-with-lease
```

---

## Exercise 9: Code Review and Pull Requests

**Goal:** Practice code review workflow.

### Create Feature with Multiple Commits

**Step 1: Create Feature Branch**

```bash
git checkout main
git checkout -b feature/user-profile
```

**Step 2: Make Multiple Small Commits**

```bash
# Commit 1: Backend model
# Edit: backend/src/models/User.js (add profile fields)

git add backend/src/models/User.js
git commit -m "feat(backend): Add profile fields to User model"

# Commit 2: Backend API
# Edit: backend/src/routes/users.js (add profile endpoints)

git add backend/src/routes/users.js
git commit -m "feat(backend): Add user profile API endpoints"

# Commit 3: Frontend service
# Create: frontend/src/services/userProfile.js

git add frontend/src/services/userProfile.js
git commit -m "feat(frontend): Add user profile service"

# Commit 4: Frontend component
# Create: frontend/src/pages/Profile.jsx

git add frontend/src/pages/Profile.jsx
git commit -m "feat(frontend): Add user profile page"
```

**Step 3: Push and Create PR**

```bash
git push origin feature/user-profile
# Create Pull Request with description
```

**Step 4: Address Review Comments**

```bash
# Make requested changes
# Edit files based on feedback

git add .
git commit -m "fix: Address code review comments"
git push origin feature/user-profile
```

**Step 5: Squash Commits (Optional)**

```bash
git rebase -i HEAD~4
# Change 'pick' to 'squash' for commits 2-4
# Rewrite commit message
git push origin feature/user-profile --force-with-lease
```

---

## Exercise 10: Database Migration Management

**Goal:** Manage database schema changes with Git.

### Add New Field to Task Model

**Step 1: Create Migration Branch**

```bash
git checkout main
git checkout -b feature/task-estimation
```

**Step 2: Create Migration File**

```bash
mkdir -p backend/migrations
cat > backend/migrations/001-add-estimated-hours.js << 'EOF'
module.exports = {
  up: async (db) => {
    await db.collection('tasks').updateMany(
      {},
      { $set: { estimatedHours: 0 } }
    );
  },
  down: async (db) => {
    await db.collection('tasks').updateMany(
      {},
      { $unset: { estimatedHours: '' } }
    );
  }
};
EOF

git add backend/migrations/001-add-estimated-hours.js
git commit -m "feat(backend): Add migration for task estimated hours"
```

**Step 3: Update Model**

```bash
# Edit: backend/src/models/Task.js
# Add: estimatedHours: { type: Number, default: 0 }

git add backend/src/models/Task.js
git commit -m "feat(backend): Add estimatedHours field to Task model"
```

**Step 4: Update API**

```bash
# Update tasks route to handle estimatedHours

git add backend/src/routes/tasks.js
git commit -m "feat(backend): Update tasks API to support estimated hours"
```

---

## Exercise 11: API Versioning

**Goal:** Manage API versions when making breaking changes.

### Create API v2

**Step 1: Create Versioning Branch**

```bash
git checkout main
git checkout -b feature/api-v2
```

**Step 2: Create v2 Routes**

```bash
mkdir -p backend/src/routes/v2
cp backend/src/routes/tasks.js backend/src/routes/v2/tasks.js

# Modify v2/tasks.js with breaking changes
# Change response format, add new fields, etc.

git add backend/src/routes/v2/
git commit -m "feat(backend): Add API v2 routes with breaking changes"
```

**Step 3: Update Server**

```bash
# Edit: backend/src/server.js
# Add: app.use('/api/v2/tasks', require('./routes/v2/tasks'));

git add backend/src/server.js
git commit -m "feat(backend): Register API v2 routes"
```

**Step 4: Keep v1 for Backward Compatibility**

```bash
# Ensure v1 routes still work
# Document deprecation timeline

git add backend/src/routes/
git commit -m "docs: Document API v1 deprecation timeline"
```

---

## Exercise 12: Frontend Feature Flags

**Goal:** Use Git branches for feature flags.

### Implement Feature Flag System

**Step 1: Create Feature Flag Branch**

```bash
git checkout main
git checkout -b feature/feature-flags
```

**Step 2: Create Feature Flag Service**

```bash
cat > frontend/src/services/featureFlags.js << 'EOF'
const flags = {
  newDashboard: process.env.REACT_APP_FEATURE_NEW_DASHBOARD === 'true',
  analytics: process.env.REACT_APP_FEATURE_ANALYTICS === 'true',
  chat: process.env.REACT_APP_FEATURE_CHAT === 'true',
};

export const isFeatureEnabled = (flagName) => {
  return flags[flagName] || false;
};
EOF

git add frontend/src/services/featureFlags.js
git commit -m "feat(frontend): Add feature flag service"
```

**Step 3: Use Feature Flags in Components**

```bash
# Edit: frontend/src/App.jsx
# Conditionally render features based on flags

git add frontend/src/App.jsx
git commit -m "feat(frontend): Implement feature flags in App"
```

---

## Exercise 13: Deployment Branches

**Goal:** Manage different deployment environments.

### Create Environment-Specific Branches

**Step 1: Create Staging Branch**

```bash
git checkout main
git checkout -b staging
```

**Step 2: Update Environment Config**

```bash
# Create: backend/.env.staging
# Create: frontend/.env.staging

git add backend/.env.staging frontend/.env.staging
git commit -m "chore: Add staging environment configuration"
```

**Step 3: Create Production Branch**

```bash
git checkout main
git checkout -b production
```

**Step 4: Update Production Config**

```bash
# Create: backend/.env.production
# Create: frontend/.env.production

git add backend/.env.production frontend/.env.production
git commit -m "chore: Add production environment configuration"
```

**Workflow:**
- Merge features to `main`
- Merge `main` to `staging` for testing
- Merge `staging` to `production` after approval

---

## Exercise 14: Rollback Strategies

**Goal:** Learn to rollback problematic deployments.

### Scenario: Bug Introduced in Latest Release

**Step 1: Identify Bad Commit**

```bash
git log --oneline
# Find the commit hash of the problematic release
```

**Step 2: Create Hotfix Branch**

```bash
git checkout main
git checkout -b hotfix/rollback-bug
```

**Step 3: Revert the Commit**

```bash
git revert <bad-commit-hash>
git commit -m "revert: Rollback problematic feature"
```

**Step 4: Alternative: Reset (Use with Caution)**

```bash
# Only if you haven't pushed yet
git reset --hard <good-commit-hash>
```

**Step 5: Deploy Fix**

```bash
git checkout main
git merge hotfix/rollback-bug
git tag -a v1.0.2 -m "Hotfix: Rollback buggy feature"
```

---

## Exercise 15: Full Development Cycle

**Goal:** Complete a full feature development cycle.

### Complete Feature: Task Dependencies

**Step 1: Planning**

```bash
git checkout main
git checkout -b feature/task-dependencies
```

**Step 2: Backend Development**

```bash
# Update Task model
# Add: dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]

git add backend/src/models/Task.js
git commit -m "feat(backend): Add dependencies field to Task model"

# Add validation logic
# Create: backend/src/middleware/taskValidation.js

git add backend/src/middleware/taskValidation.js
git commit -m "feat(backend): Add task dependency validation"

# Update API
# Edit: backend/src/routes/tasks.js

git add backend/src/routes/tasks.js
git commit -m "feat(backend): Add dependency endpoints to tasks API"
```

**Step 3: Frontend Development**

```bash
# Update API service
# Edit: frontend/src/services/api.js

git add frontend/src/services/api.js
git commit -m "feat(frontend): Add task dependency API methods"

# Create dependency UI component
# Create: frontend/src/components/TaskDependencies.jsx

git add frontend/src/components/TaskDependencies.jsx
git commit -m "feat(frontend): Add task dependencies component"

# Integrate into Tasks page
# Edit: frontend/src/pages/Tasks.jsx

git add frontend/src/pages/Tasks.jsx
git commit -m "feat(frontend): Integrate dependencies into tasks page"
```

**Step 4: Testing**

```bash
# Add tests
# Create: backend/tests/taskDependencies.test.js

git add backend/tests/taskDependencies.test.js
git commit -m "test: Add task dependency tests"
```

**Step 5: Documentation**

```bash
# Update API documentation
# Edit: docs/API.md

git add docs/API.md
git commit -m "docs: Document task dependencies API"
```

**Step 6: Code Review Preparation**

```bash
# Clean up commit history
git rebase -i main
# Squash related commits, reword messages

# Push for review
git push origin feature/task-dependencies
```

**Step 7: Merge to Main**

```bash
git checkout main
git merge feature/task-dependencies --no-ff -m "Merge feature/task-dependencies: Add task dependency management"
```

**Step 8: Tag Release**

```bash
git tag -a v1.2.0 -m "Release: Task dependencies feature"
```

---

## Best Practices Summary

### Commit Messages
- Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`
- Specify scope: `feat(backend):` or `feat(frontend):`
- Keep commits atomic and focused

### Branch Naming
- `feature/` - New features
- `bugfix/` or `fix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `release/` - Release preparation
- `chore/` - Maintenance tasks

### Workflow
1. Always start from updated `main`
2. Create feature branches for each feature
3. Make small, focused commits
4. Test before merging
5. Use pull requests for code review
6. Merge with `--no-ff` to preserve history
7. Tag releases
8. Clean up merged branches

### Full-Stack Considerations
- Coordinate backend and frontend changes
- Update API documentation when changing APIs
- Consider backward compatibility
- Test integration between layers
- Use feature flags for gradual rollouts

---

## Troubleshooting

### Merge Conflicts
```bash
# View conflicts
git status
git diff

# Resolve manually
# Edit conflicted files
git add <resolved-files>
git commit
```

### Undo Last Commit
```bash
# Keep changes
git reset --soft HEAD~1

# Discard changes
git reset --hard HEAD~1
```

### Recover Lost Work
```bash
# View reflog
git reflog

# Recover commit
git checkout <commit-hash>
git checkout -b recovered-branch
```

---

## Next Steps

1. Practice each exercise in order
2. Experiment with different scenarios
3. Try working with a remote repository
4. Set up CI/CD pipelines
5. Implement code review workflows
6. Practice with a team

**Happy coding! 🚀**

