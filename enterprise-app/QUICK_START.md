# Quick Start Guide - Enterprise App Git Exercises

## 🚀 Getting Started

This is a **full-stack enterprise web application** designed specifically for practicing Git workflows in a real-world development scenario.

## 📁 Project Structure

```
enterprise-app/
├── backend/          # Node.js + Express + MongoDB API
├── frontend/          # React + Material-UI frontend
├── docs/              # Documentation
│   └── git-exercises.md  # Comprehensive Git exercises
└── README.md          # Project overview
```

## 🎯 What You'll Practice

- Feature branch development
- Backend/Frontend coordination
- Merge strategies
- Conflict resolution
- Hotfix workflows
- Release management
- Code review processes
- Database migrations
- API versioning
- Deployment strategies

## 📚 Current Branches

```bash
cd enterprise-app
git branch -a
```

**Available branches:**
- `main` - Production-ready code
- `feature/notifications` - Notification system
- `feature/analytics` - Analytics dashboard  
- `feature/file-upload` - File upload functionality
- `bugfix/auth-token-expiry` - Auth bug fix

## 🏃 Quick Start

### 1. View Repository Structure

```bash
cd enterprise-app
git log --oneline --graph --all
```

### 2. Try Your First Exercise

```bash
# Merge a feature branch
git checkout main
git merge feature/notifications --no-ff
```

### 3. Follow the Exercises

Open `docs/git-exercises.md` and follow the 15 comprehensive exercises!

## 📖 Exercises Overview

1. **Initial Setup** - Understand repository structure
2. **Feature Development** - Create new features
3. **Backend/Frontend Coordination** - Coordinate changes
4. **Merging Features** - Merge branches properly
5. **Conflict Resolution** - Resolve merge conflicts
6. **Hotfix Workflow** - Fix critical bugs
7. **Release Management** - Prepare releases
8. **Collaborative Development** - Work with team
9. **Code Review** - PR workflow
10. **Database Migrations** - Manage schema changes
11. **API Versioning** - Handle breaking changes
12. **Feature Flags** - Gradual rollouts
13. **Deployment Branches** - Environment management
14. **Rollback Strategies** - Revert problematic changes
15. **Full Development Cycle** - Complete workflow

## 🛠️ Setup (Optional)

If you want to run the application:

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure your MongoDB URI
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 💡 Tips

1. **Start with Exercise 1** - Build understanding gradually
2. **Read the guide** - `docs/git-exercises.md` has detailed instructions
3. **Experiment** - Try different Git commands
4. **Use `git status`** - Check your state frequently
5. **Visualize** - Use `git log --oneline --graph --all`

## 📝 What Makes This Special

✅ **Real Enterprise Structure** - Backend + Frontend separation  
✅ **Multiple Feature Branches** - Ready to practice merging  
✅ **Conflict Scenarios** - Learn to resolve conflicts  
✅ **Full-Stack Focus** - Coordinate backend/frontend changes  
✅ **15 Comprehensive Exercises** - From basics to advanced  
✅ **Real Code** - Actual working application code  

## 🎓 Learning Path

1. Read `README.md` - Understand the project
2. Read `docs/git-exercises.md` - Study the exercises
3. Start with Exercise 1 - Build confidence
4. Progress through exercises - Learn progressively
5. Experiment - Try your own scenarios

## 🔗 Related Files

- `docs/git-exercises.md` - Complete exercise guide
- `README.md` - Project documentation
- `../git-team-collaboration-guide.md` - General Git guide

---

**Ready to start?** Open `docs/git-exercises.md` and begin with Exercise 1! 🚀

