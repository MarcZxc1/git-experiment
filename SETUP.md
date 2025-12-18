# Git Practice Setup Guide

This repository is set up to practice all the Git workflows described in the comprehensive guide.

## Current Repository State

The repository has been initialized with:

### Branches Created:
- `main` - Main development branch with initial commits
- `feature/shopping-cart` - Feature branch with shopping cart implementation
- `feature/search` - Feature branch with search functionality  
- `feature/user-authentication` - Feature branch with enhanced authentication (has conflicts with main)
- `hotfix/security-patch` - Hotfix branch with security improvements
- `release/v1.1.0` - Release branch for version 1.1.0

### Files Structure:
```
.
├── README.md
├── SETUP.md
├── git-team-collaboration-guide.md
├── package.json
├── .gitignore
├── CHANGELOG.md
├── src/
│   ├── app.js
│   ├── auth.js (modified on multiple branches - conflict scenario)
│   ├── cart.js (on feature/shopping-cart)
│   ├── payment.js
│   ├── search.js (on feature/search)
│   └── utils.js
└── tests/
    └── auth.test.js
```

## Practice Scenarios

### 1. Basic Branching and Merging

```bash
# View all branches
git branch -a

# Switch to feature branch
git checkout feature/shopping-cart

# View differences
git diff main

# Merge feature into main
git checkout main
git merge feature/shopping-cart
```

### 2. Fast-Forward Merge

```bash
# The shopping-cart branch is ahead of main
# This will be a fast-forward merge
git checkout main
git merge feature/shopping-cart
```

### 3. Conflict Resolution

```bash
# Try merging feature/user-authentication into main
# This will create a conflict in src/auth.js
git checkout main
git merge feature/user-authentication

# Resolve the conflict manually
# Then:
git add src/auth.js
git commit
```

### 4. Rebasing

```bash
# Rebase feature branch onto main
git checkout feature/search
git rebase main

# If conflicts occur, resolve them and continue
git rebase --continue
```

### 5. Hotfix Workflow

```bash
# Work on hotfix
git checkout hotfix/security-patch
# View the security fix
cat src/auth.js

# Merge hotfix to main
git checkout main
git merge hotfix/security-patch

# Tag the release
git tag -a v1.0.1 -m "Security patch release"
```

### 6. Release Branch

```bash
# Check release branch
git checkout release/v1.1.0
# View changes
git log --oneline

# Merge to main
git checkout main
git merge release/v1.1.0
git tag -a v1.1.0 -m "Release version 1.1.0"
```

### 7. Stashing

```bash
# Make changes on a branch
git checkout feature/shopping-cart
echo "// New feature" >> src/cart.js

# Stash changes
git stash

# Switch branches
git checkout main

# Restore stashed changes
git checkout feature/shopping-cart
git stash pop
```

### 8. Cherry-Picking

```bash
# Pick a specific commit from another branch
git checkout main
git log --oneline --all

# Cherry-pick a commit
git cherry-pick <commit-hash>
```

### 9. Viewing History

```bash
# View commit graph
git log --oneline --graph --all

# View specific file history
git log --follow src/auth.js

# View changes in a commit
git show <commit-hash>
```

### 10. Undoing Changes

```bash
# Undo uncommitted changes
git checkout -- src/app.js

# Reset last commit (keep changes)
git reset --soft HEAD~1

# Revert a commit
git revert <commit-hash>
```

## Simulating Team Collaboration

### Scenario: Two Developers Working Simultaneously

**Developer A:**
```bash
git checkout main
git pull origin main  # (simulate with git fetch)
git checkout -b feature/new-feature
# Make changes
echo "// New feature" > src/new-feature.js
git add src/new-feature.js
git commit -m "feat: Add new feature"
```

**Developer B (simulating parallel work):**
```bash
# On main, make changes
git checkout main
echo "// Update" >> src/app.js
git add src/app.js
git commit -m "Update app.js"
```

Now Developer A needs to update their branch:
```bash
git checkout feature/new-feature
git merge main  # or git rebase main
```

## Advanced Scenarios

### Interactive Rebase

```bash
git checkout feature/shopping-cart
git rebase -i HEAD~2
# Edit commits, squash, reword, etc.
```

### Bisect (Finding Bugs)

```bash
git bisect start
git bisect bad  # Current commit has bug
git bisect good v1.0.0  # This commit was good
# Test and mark good/bad until bug is found
git bisect reset
```

### Reflog (Recovery)

```bash
# View reflog
git reflog

# Recover a "lost" commit
git checkout <commit-hash>
git checkout -b recovered-branch
```

## Setting Up Remote (Optional)

To practice with remotes, you can:

1. Create a repository on GitHub/GitLab
2. Add it as remote:
```bash
git remote add origin <your-repo-url>
git push -u origin main
git push --all origin  # Push all branches
```

## Tips

- Use `git status` frequently to see current state
- Use `git log --oneline --graph --all` to visualize branch structure
- Practice resolving conflicts by merging `feature/user-authentication` into `main`
- Try different merge strategies: `--no-ff`, `--squash`
- Experiment with rebasing vs merging

## Next Steps

1. Read the comprehensive guide: `git-team-collaboration-guide.md`
2. Practice each scenario listed above
3. Try creating your own branches and features
4. Experiment with different Git commands
5. Practice conflict resolution

Happy learning! 🚀

