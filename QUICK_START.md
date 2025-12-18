# Quick Start Guide

Welcome! This repository is ready for practicing Git workflows.

## What's Included

✅ **Comprehensive Guide** - `git-team-collaboration-guide.md`  
✅ **Setup Instructions** - `SETUP.md`  
✅ **Practice Exercises** - `PRACTICE_EXERCISES.md`  
✅ **Sample Codebase** - Multiple branches with real code

## Repository Structure

```
.
├── README.md                          # Project overview
├── SETUP.md                           # Detailed setup guide
├── PRACTICE_EXERCISES.md              # Step-by-step exercises
├── git-team-collaboration-guide.md    # Comprehensive Git guide
├── QUICK_START.md                     # This file
├── package.json                       # Project configuration
├── CHANGELOG.md                       # Version history
├── .gitignore                         # Git ignore rules
├── src/
│   ├── app.js                        # Main application
│   ├── auth.js                       # Authentication (conflict scenario)
│   ├── cart.js                       # Shopping cart (on feature branch)
│   ├── payment.js                    # Payment processing
│   ├── search.js                     # Search (on feature branch)
│   └── utils.js                      # Utility functions
└── tests/
    └── auth.test.js                  # Test file
```

## Current Branches

- `main` - Main development branch
- `feature/shopping-cart` - Shopping cart feature
- `feature/search` - Search functionality
- `feature/user-authentication` - Enhanced auth (has conflicts!)
- `hotfix/security-patch` - Security fix
- `release/v1.1.0` - Release preparation

## Get Started in 3 Steps

### Step 1: Explore the Repository

```bash
# View all branches
git branch -a

# View commit history
git log --oneline --graph --all --decorate
```

### Step 2: Try Your First Merge

```bash
# Merge shopping cart feature
git checkout main
git merge feature/shopping-cart

# Verify the merge
ls src/cart.js
```

### Step 3: Practice Conflict Resolution

```bash
# This will create a conflict!
git checkout main
git merge feature/user-authentication

# Resolve the conflict in src/auth.js
# Then: git add src/auth.js && git commit
```

## Recommended Learning Path

1. **Read the Guide** → `git-team-collaboration-guide.md`
2. **Review Setup** → `SETUP.md`
3. **Do Exercises** → `PRACTICE_EXERCISES.md`
4. **Experiment** → Try your own scenarios!

## Key Files to Know

- **Guide**: Complete reference for all Git workflows
- **Setup**: Explains repository structure and scenarios
- **Exercises**: 15+ hands-on exercises with solutions

## Quick Commands Reference

```bash
# View branches
git branch -a

# View history
git log --oneline --graph --all

# Switch branches
git checkout <branch-name>

# Merge branches
git merge <branch-name>

# Rebase branch
git rebase <branch-name>

# View status
git status

# View differences
git diff
```

## What You Can Practice

✅ Branching and merging  
✅ Conflict resolution  
✅ Rebasing  
✅ Stashing  
✅ Hotfix workflows  
✅ Release management  
✅ Cherry-picking  
✅ Interactive rebase  
✅ History viewing  
✅ Undoing changes  
✅ Tagging  
✅ And much more!

## Need Help?

1. Check `git-team-collaboration-guide.md` for detailed explanations
2. See `PRACTICE_EXERCISES.md` for step-by-step exercises
3. Use `git status` and `git log` to understand current state
4. Remember: `git reflog` can help recover "lost" commits

## Pro Tips

- Always check `git status` before important operations
- Use `git log --oneline --graph --all` to visualize branches
- Practice conflict resolution - it's essential!
- Experiment freely - you can always reset or create new branches

---

**Ready to start?** Open `PRACTICE_EXERCISES.md` and begin with Exercise 1! 🚀

