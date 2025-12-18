# Comprehensive Git Guide for Team Collaboration

## Table of Contents
1. [Introduction](#introduction)
2. [Git Fundamentals](#git-fundamentals)
3. [Remote Repositories](#remote-repositories)
4. [Branching Strategies](#branching-strategies)
5. [Merging](#merging)
6. [Rebasing](#rebasing)
7. [Conflict Resolution](#conflict-resolution)
8. [Pull Requests and Code Review](#pull-requests-and-code-review)
9. [Common Team Scenarios](#common-team-scenarios)
10. [Best Practices](#best-practices)
11. [Advanced Topics](#advanced-topics)
12. [Troubleshooting](#troubleshooting)

---

## Introduction

Git is a distributed version control system that enables teams to collaborate on code efficiently. This guide covers everything you need to know about using Git in a team environment, from basic operations to advanced workflows.

### Why Git for Teams?
- **Distributed**: Every developer has a full copy of the repository
- **Branching**: Easy to create and merge branches
- **History**: Complete history of all changes
- **Collaboration**: Multiple developers can work simultaneously without conflicts

---

## Git Fundamentals

### Initial Setup

```bash
# Configure your identity (do this once)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check your configuration
git config --list
```

**Output:**
```
user.name=Your Name
user.email=your.email@example.com
```

### Creating a Repository

```bash
# Initialize a new repository
mkdir my-project
cd my-project
git init
```

**Output:**
```
Initialized empty Git repository in /path/to/my-project/.git/
```

**What happens:**
- Creates a `.git` directory containing all repository metadata
- Sets up the repository structure

### Basic Workflow

```bash
# Create a file
echo "# My Project" > README.md

# Check status
git status
```

**Output:**
```
On branch main
Untracked files:
  README.md

nothing added to commit but untracked files present
```

```bash
# Stage the file
git add README.md

# Check status again
git status
```

**Output:**
```
On branch main
Changes to be committed:
  new file:   README.md
```

```bash
# Commit the file
git commit -m "Add README.md"
```

**Output:**
```
[main (root-commit) a1b2c3d] Add README.md
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
```

### Viewing History

```bash
# View commit history
git log
```

**Output:**
```
commit a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
Author: Your Name <your.email@example.com>
Date:   Mon Jan 15 10:30:00 2024 +0000

    Add README.md
```

```bash
# Compact view
git log --oneline --graph --all
```

**Output:**
```
a1b2c3d Add README.md
```

---

## Remote Repositories

### Adding a Remote

```bash
# Add a remote repository
git remote add origin https://github.com/team/project.git

# View remotes
git remote -v
```

**Output:**
```
origin  https://github.com/team/project.git (fetch)
origin  https://github.com/team/project.git (push)
```

### Cloning a Repository

```bash
# Clone a repository
git clone https://github.com/team/project.git
cd project
```

**Output:**
```
Cloning into 'project'...
remote: Enumerating objects: 100, done.
remote: Counting objects: 100% (100/100), done.
remote: Compressing objects: 100% (80/80), done.
remote: Total 100 (delta 20), reused 100 (delta 20), pack-reused 0
Receiving objects: 100% (100/100), 50.00 KiB | 2.00 MiB/s, done.
Resolving deltas: 100% (20/20), done.
```

**What happens:**
- Downloads the entire repository history
- Creates a local copy with all branches
- Sets up `origin` remote automatically

### Fetching and Pulling

```bash
# Fetch changes from remote (doesn't merge)
git fetch origin
```

**Output:**
```
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
From https://github.com/team/project
   a1b2c3d..e5f6g7h  main       -> origin/main
```

```bash
# Pull changes (fetch + merge)
git pull origin main
```

**Output:**
```
Updating a1b2c3d..e5f6g7h
Fast-forward
 README.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

### Pushing Changes

```bash
# Push to remote
git push origin main
```

**Output:**
```
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 300 bytes | 300.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/team/project.git
   a1b2c3d..e5f6g7h  main -> main
```

---

## Branching Strategies

### Creating and Switching Branches

```bash
# Create a new branch
git branch feature-login

# Switch to the branch
git checkout feature-login
```

**Output:**
```
Switched to branch 'feature-login'
```

```bash
# Create and switch in one command
git checkout -b feature-login
```

**Output:**
```
Switched to a new branch 'feature-login'
```

```bash
# Modern way (Git 2.23+)
git switch -c feature-login
```

**Output:**
```
Switched to a new branch 'feature-login'
```

### Viewing Branches

```bash
# List local branches
git branch
```

**Output:**
```
  feature-login
* main
```

```bash
# List all branches (local and remote)
git branch -a
```

**Output:**
```
  feature-login
* main
  remotes/origin/main
  remotes/origin/feature-login
```

### Branching Workflow Example

```bash
# Start from main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/user-authentication

# Make changes
echo "function authenticate() { }" > auth.js
git add auth.js
git commit -m "Add authentication function"

# View branch structure
git log --oneline --graph --all
```

**Output:**
```
* 4d5e6f7 (HEAD -> feature/user-authentication) Add authentication function
* a1b2c3d (main, origin/main) Add README.md
```

### Pushing Branches

```bash
# Push branch to remote
git push origin feature/user-authentication
```

**Output:**
```
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 200 bytes | 200.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/team/project.git
 * [new branch]      feature/user-authentication -> feature/user-authentication
```

```bash
# Set upstream tracking
git push -u origin feature/user-authentication
```

**Output:**
```
Branch 'feature/user-authentication' set up to track remote branch 'feature/user-authentication' from 'origin'.
```

---

## Merging

### Fast-Forward Merge

**Scenario:** Feature branch is ahead of main with no diverging commits.

```bash
# On main branch
git checkout main
git merge feature/user-authentication
```

**Output:**
```
Updating a1b2c3d..4d5e6f7
Fast-forward
 auth.js | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 auth.js
```

**What happens:**
- Main pointer moves forward to the feature branch commit
- No merge commit is created
- Linear history is maintained

```bash
# View the result
git log --oneline --graph
```

**Output:**
```
4d5e6f7 (HEAD -> main) Add authentication function
a1b2c3d Add README.md
```

### Merge Commit (Three-Way Merge)

**Scenario:** Both branches have new commits.

```bash
# On main, someone else pushed changes
git checkout main
git pull origin main

# Meanwhile, you worked on feature branch
git checkout feature/user-authentication
echo "function validate() { }" >> auth.js
git add auth.js
git commit -m "Add validation function"

# Now merge
git checkout main
git merge feature/user-authentication
```

**Output:**
```
Merge made by the 'three-way' strategy.
 auth.js | 1 +
 1 file changed, 1 insertion(+)
```

**What happens:**
- Git creates a merge commit that combines both branches
- Both histories are preserved

```bash
# View merge history
git log --oneline --graph --all
```

**Output:**
```
*   7h8i9j0 (HEAD -> main) Merge branch 'feature/user-authentication'
|\
| * 4d5e6f7 (feature/user-authentication) Add validation function
* | 5k6l7m8 Update README
|/
* a1b2c3d Add README.md
```

### Merge Strategies

```bash
# No fast-forward (always create merge commit)
git merge --no-ff feature/user-authentication
```

**Output:**
```
Merge made by the 'three-way' strategy.
 auth.js | 1 +
 1 file changed, 1 insertion(+)
```

```bash
# Squash merge (combine all commits into one)
git merge --squash feature/user-authentication
git commit -m "Add user authentication feature"
```

**Output:**
```
Updating a1b2c3d..7h8i9j0
Fast-forward
Squashed commit of the following:
 4d5e6f7 Add authentication function
 5k6l7m8 Add validation function
```

**What happens:**
- All feature branch commits are combined into a single commit
- Feature branch history is not preserved in main
- Cleaner main branch history

### Aborting a Merge

```bash
# If merge conflicts occur and you want to abort
git merge --abort
```

**Output:**
```
Merge aborted.
```

---

## Rebasing

### Basic Rebasing

**Scenario:** Keep feature branch up-to-date with main.

```bash
# On feature branch
git checkout feature/user-authentication

# Rebase onto main
git rebase main
```

**Output:**
```
First, rewinding head to replay your work on top of it...
Applying: Add authentication function
Applying: Add validation function
```

**What happens:**
- Feature branch commits are replayed on top of main
- Creates linear history
- Rewrites commit hashes

```bash
# View rebased history
git log --oneline --graph --all
```

**Output:**
```
* 9m0n1o2 (HEAD -> feature/user-authentication) Add validation function
* 8l9m0n1 Add authentication function
* 5k6l7m8 (main) Update README
* a1b2c3d Add README.md
```

### Interactive Rebasing

```bash
# Rebase last 3 commits interactively
git rebase -i HEAD~3
```

**Opens editor with:**
```
pick a1b2c3d Add README.md
pick 4d5e6f7 Add authentication function
pick 5k6l7m8 Add validation function

# Rebase 7h8i9j0 onto 9m0n1o2 (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# d, drop <commit> = remove commit
```

**After editing (squashing second commit):**
```
pick a1b2c3d Add README.md
squash 4d5e6f7 Add authentication function
pick 5k6l7m8 Add validation function
```

**Output:**
```
Successfully rebased and updated refs/heads/feature/user-authentication.
```

### Rebasing vs Merging

**Merging:**
- Preserves complete history
- Shows when branches diverged
- Creates merge commits
- Non-destructive

**Rebasing:**
- Creates linear history
- Cleaner project history
- Rewrites commit history
- Should not be used on shared branches

### Aborting a Rebase

```bash
# If rebase conflicts occur
git rebase --abort
```

**Output:**
```
Rebase aborted.
```

---

## Conflict Resolution

### Understanding Conflicts

**Scenario:** Two developers modify the same lines.

```bash
# Developer A on main
echo "function login() { return true; }" > auth.js
git add auth.js
git commit -m "Add login function"
git push origin main

# Developer B on feature branch
git checkout feature/user-authentication
echo "function login() { return false; }" > auth.js
git add auth.js
git commit -m "Add login function"

# Try to merge
git checkout main
git merge feature/user-authentication
```

**Output:**
```
Auto-merging auth.js
CONFLICT (content): Merge conflict in auth.js
Automatic merge failed; fix conflicts and then commit the result.
```

### Viewing Conflicts

```bash
# Check status
git status
```

**Output:**
```
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   auth.js
```

```bash
# View conflicted file
cat auth.js
```

**Output:**
```
<<<<<<< HEAD
function login() { return true; }
=======
function login() { return false; }
>>>>>>> feature/user-authentication
```

### Resolving Conflicts

**Step 1: Edit the file manually**

```bash
# Edit auth.js to resolve conflict
# Choose one version or combine both
```

**Resolved file:**
```javascript
function login() {
  // Check credentials
  return checkCredentials();
}
```

**Step 2: Stage the resolved file**

```bash
git add auth.js
```

**Step 3: Complete the merge**

```bash
git commit
```

**Output:**
```
Merge branch 'feature/user-authentication' into main

Conflicts:
        auth.js
```

### Using Merge Tools

```bash
# Configure merge tool
git config --global merge.tool vimdiff

# Use merge tool
git mergetool
```

**Opens visual diff tool showing:**
- Local changes (HEAD)
- Remote changes (feature branch)
- Merged result

### Conflict Resolution Strategies

**1. Accept Current Change (Theirs)**
```bash
git checkout --theirs auth.js
git add auth.js
git commit
```

**2. Accept Incoming Change (Ours)**
```bash
git checkout --ours auth.js
git add auth.js
git commit
```

**3. Manual Resolution (Recommended)**
- Edit file manually
- Remove conflict markers
- Test the code
- Stage and commit

---

## Pull Requests and Code Review

### Creating a Pull Request

**Workflow:**
1. Create feature branch
2. Make changes and commit
3. Push branch to remote
4. Create pull request on GitHub/GitLab

```bash
# Complete workflow
git checkout -b feature/payment-integration
echo "function processPayment() { }" > payment.js
git add payment.js
git commit -m "Add payment processing"
git push -u origin feature/payment-integration
```

**Output:**
```
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 250 bytes | 250.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/team/project.git
 * [new branch]      feature/payment-integration -> feature/payment-integration
Branch 'feature/payment-integration' set up to track remote branch 'feature/payment-integration' from 'origin'.
```

**On GitHub:**
- Navigate to repository
- Click "New Pull Request"
- Select base branch (main) and compare branch (feature/payment-integration)
- Add description and reviewers
- Submit pull request

### Updating a Pull Request

```bash
# Make additional changes
echo "function refund() { }" >> payment.js
git add payment.js
git commit -m "Add refund functionality"
git push
```

**Output:**
```
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 200 bytes | 200.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
To https://github.com/team/project.git
   1a2b3c4..5d6e7f8  feature/payment-integration -> feature/payment-integration
```

**What happens:**
- Pull request automatically updates
- Reviewers see new commits
- CI/CD runs again if configured

### Responding to Review Comments

```bash
# Address review feedback
# Make changes
echo "// Add error handling" >> payment.js
git add payment.js
git commit -m "Address review: Add error handling"
git push
```

### Merging a Pull Request

**Options:**
1. **Merge commit** - Preserves branch history
2. **Squash and merge** - Combines all commits into one
3. **Rebase and merge** - Linear history

**After merge on GitHub:**
```bash
# Update local repository
git checkout main
git pull origin main
```

**Output:**
```
Updating a1b2c3d..9m0n1o2
Fast-forward
 payment.js | 2 +
 1 file changed, 2 insertions(+)
```

### Cleaning Up After Merge

```bash
# Delete local branch
git branch -d feature/payment-integration

# Delete remote branch (if not auto-deleted)
git push origin --delete feature/payment-integration
```

**Output:**
```
Deleted branch feature/payment-integration (was 9m0n1o2).
To https://github.com/team/project.git
 - [deleted]         feature/payment-integration
```

---

## Common Team Scenarios

### Scenario 1: Starting Work on a New Feature

```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/shopping-cart

# 3. Make changes
echo "class ShoppingCart { }" > cart.js
git add cart.js
git commit -m "Add shopping cart class"

# 4. Push branch
git push -u origin feature/shopping-cart
```

**Output:**
```
Switched to branch 'main'
Already up to date.
Switched to a new branch 'feature/shopping-cart'
[feature/shopping-cart 2a3b4c5] Add shopping cart class
 1 file changed, 1 insertion(+)
Branch 'feature/shopping-cart' set up to track remote branch 'feature/shopping-cart' from 'origin'.
```

### Scenario 2: Keeping Feature Branch Updated

```bash
# While working on feature, main has new commits
git checkout feature/shopping-cart

# Option 1: Merge main into feature
git merge main
```

**Output:**
```
Merge made by the 'three-way' strategy.
 utils.js | 10 +
 1 file changed, 10 insertions(+)
```

```bash
# Option 2: Rebase feature onto main (preferred for cleaner history)
git rebase main
```

**Output:**
```
First, rewinding head to replay your work on top of it...
Applying: Add shopping cart class
```

### Scenario 3: Multiple Developers on Same Feature

```bash
# Developer A
git checkout -b feature/search
echo "function search() { }" > search.js
git add search.js
git commit -m "Add search function"
git push -u origin feature/search

# Developer B (joins later)
git fetch origin
git checkout feature/search
git pull origin feature/search
```

**Output:**
```
Switched to a new branch 'feature/search'
[feature/search 3b4c5d6] Add search function
Branch 'feature/search' set up to track remote branch 'feature/search' from 'origin'.
```

**Developer B:**
```
From https://github.com/team/project
 * [new branch]      feature/search -> origin/feature/search
Switched to branch 'feature/search'
Your branch is up to date with 'origin/feature/search'.
```

```bash
# Developer B makes changes
echo "function filter() { }" >> search.js
git add search.js
git commit -m "Add filter function"
git push
```

### Scenario 4: Hotfix Branch

```bash
# Critical bug found in production
git checkout main
git pull origin main

# Create hotfix branch from main
git checkout -b hotfix/security-patch

# Fix the bug
echo "// Security fix" >> auth.js
git add auth.js
git commit -m "Fix security vulnerability"

# Push and create PR
git push -u origin hotfix/security-patch

# After merge, tag the release
git checkout main
git pull origin main
git tag -a v1.0.1 -m "Security patch release"
git push origin v1.0.1
```

**Output:**
```
[hotfix/security-patch 4c5d6e7] Fix security vulnerability
 1 file changed, 1 insertion(+)
Branch 'hotfix/security-patch' set up to track remote branch 'hotfix/security-patch' from 'origin'.
```

**After tagging:**
```
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/team/project.git
 * [new tag]         v1.0.1 -> v1.0.1
```

### Scenario 5: Release Branch

```bash
# Prepare for release
git checkout main
git pull origin main

# Create release branch
git checkout -b release/v1.1.0

# Final testing and bug fixes
echo "// Release fixes" >> app.js
git add app.js
git commit -m "Fix bugs for v1.1.0 release"

# Merge to main and develop (if using Git Flow)
git checkout main
git merge --no-ff release/v1.1.0
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin main --tags

# Delete release branch
git branch -d release/v1.1.0
git push origin --delete release/v1.1.0
```

**Output:**
```
Merge made by the 'three-way' strategy.
 app.js | 1 +
 1 file changed, 1 insertion(+)
```

### Scenario 6: Undoing Changes

```bash
# Undo uncommitted changes
git checkout -- file.js

# Unstage file
git reset HEAD file.js

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

**Output:**
```
HEAD is now at a1b2c3d Previous commit message
```

```bash
# Revert a commit (creates new commit)
git revert HEAD
```

**Output:**
```
[main 5e6f7g8] Revert "Previous commit message"
 1 file changed, 1 deletion(-)
```

### Scenario 7: Stashing Changes

```bash
# Working on feature, need to switch branches
git stash
```

**Output:**
```
Saved working directory and index state WIP on feature/shopping-cart: 2a3b4c5 Add shopping cart class
```

```bash
# Switch branches
git checkout main
# Do work
git checkout feature/shopping-cart

# Restore stashed changes
git stash pop
```

**Output:**
```
On branch feature/shopping-cart
Changes not staged for commit:
  modified:   cart.js
Dropped refs/stash@{0} (abc123def456)
```

```bash
# List stashes
git stash list
```

**Output:**
```
stash@{0}: WIP on feature/shopping-cart: 2a3b4c5 Add shopping cart class
stash@{1}: WIP on main: a1b2c3d Previous work
```

### Scenario 8: Cherry-Picking

```bash
# Apply a specific commit from another branch
git checkout main
git cherry-pick 4c5d6e7
```

**Output:**
```
[main 6d7e8f9] Add filter function
 1 file changed, 1 insertion(+)
```

**What happens:**
- Applies the commit from feature branch to main
- Creates a new commit with same changes but different hash
- Useful for applying hotfixes to multiple branches

### Scenario 9: Working with Tags

```bash
# Create annotated tag
git tag -a v1.0.0 -m "Initial release"

# List tags
git tag
```

**Output:**
```
v1.0.0
v1.0.1
v1.1.0
```

```bash
# Checkout specific tag
git checkout v1.0.0

# Push tags to remote
git push origin --tags
```

**Output:**
```
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/team/project.git
 * [new tag]         v1.0.0 -> v1.0.0
```

### Scenario 10: Fork and Contribution Workflow

```bash
# Fork repository on GitHub, then clone your fork
git clone https://github.com/your-username/project.git
cd project

# Add upstream remote
git remote add upstream https://github.com/original-owner/project.git

# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
echo "New feature" > feature.js
git add feature.js
git commit -m "Add new feature"

# Push to your fork
git push -u origin feature/new-feature

# Keep fork updated
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

**Output:**
```
remote: Enumerating objects: 10, done.
remote: Counting objects: 100% (10/10), done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 5 (delta 3), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (5/5), done.
From https://github.com/original-owner/project
   a1b2c3d..e5f6g7h  main       -> upstream/main
Updating a1b2c3d..e5f6g7h
Fast-forward
```

---

## Best Practices

### 1. Commit Messages

**Good commit messages:**
```
feat: Add user authentication
fix: Resolve login timeout issue
docs: Update API documentation
style: Format code according to style guide
refactor: Simplify authentication logic
test: Add unit tests for payment processing
chore: Update dependencies
```

**Bad commit messages:**
```
- "fix"
- "update"
- "changes"
- "asdf"
```

### 2. Branch Naming Conventions

```
feature/user-authentication
bugfix/login-error
hotfix/security-patch
release/v1.2.0
chore/update-dependencies
```

### 3. Workflow Best Practices

```bash
# Always pull before starting work
git checkout main
git pull origin main

# Create descriptive branch names
git checkout -b feature/descriptive-name

# Commit often with meaningful messages
git commit -m "feat: Add shopping cart functionality"

# Keep branches focused (one feature per branch)
# Test before pushing
# Review your changes before committing
git diff
git status
```

### 4. Team Communication

- **Always communicate** when working on shared branches
- **Update team** about breaking changes
- **Coordinate** on large features
- **Review** pull requests promptly
- **Document** complex changes

### 5. Repository Hygiene

```bash
# Clean up merged branches
git branch --merged | grep -v "\*\|main\|develop" | xargs -n 1 git branch -d

# Prune remote branches
git remote prune origin

# Clean untracked files
git clean -fd
```

**Output:**
```
Deleted branch feature/old-feature (was 1a2b3c4).
```

---

## Advanced Topics

### Git Hooks

**Pre-commit hook example:**
```bash
# .git/hooks/pre-commit
#!/bin/sh
npm test
if [ $? -ne 0 ]; then
    echo "Tests failed. Commit aborted."
    exit 1
fi
```

**Make it executable:**
```bash
chmod +x .git/hooks/pre-commit
```

### Submodules

```bash
# Add a submodule
git submodule add https://github.com/user/repo.git libs/repo

# Clone repository with submodules
git clone --recursive https://github.com/team/project.git

# Update submodules
git submodule update --init --recursive
```

**Output:**
```
Cloning into 'libs/repo'...
remote: Enumerating objects: 100, done.
remote: Counting objects: 100% (100/100), done.
remote: Compressing objects: 100% (80/80), done.
remote: Total 100 (delta 20), reused 100 (delta 20), pack-reused 0
Receiving objects: 100% (100/100), 50.00 KiB | 2.00 MiB/s, done.
Resolving deltas: 100% (20/20), done.
```

### Git Worktree

```bash
# Create additional working tree
git worktree add ../project-hotfix hotfix/security-patch

# List worktrees
git worktree list
```

**Output:**
```
/home/user/project              a1b2c3d [main]
/home/user/project-hotfix       4c5d6e7 [hotfix/security-patch]
```

### Bisect (Finding Bugs)

```bash
# Start bisect
git bisect start

# Mark current commit as bad
git bisect bad

# Mark a known good commit
git bisect good v1.0.0
```

**Output:**
```
Bisecting: 5 revisions left to test after this (roughly 3 steps)
[3d4e5f6] Commit message
```

```bash
# Test and mark as good or bad
git bisect good  # or git bisect bad

# Continue until bug is found
# Reset when done
git bisect reset
```

### Reflog (Recovery)

```bash
# View reflog
git reflog
```

**Output:**
```
a1b2c3d HEAD@{0}: checkout: moving from feature to main
4c5d6e7 HEAD@{1}: commit: Add feature
5d6e7f8 HEAD@{2}: checkout: moving from main to feature
```

```bash
# Recover lost commit
git checkout 4c5d6e7
git checkout -b recovered-feature
```

### Aliases

```bash
# Create useful aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

**Usage:**
```bash
git st  # instead of git status
git co feature/new  # instead of git checkout feature/new
```

---

## Troubleshooting

### Problem: "Your branch is ahead of 'origin/main' by X commits"

**Solution:**
```bash
git push origin main
```

### Problem: "Updates were rejected because the remote contains work"

**Solution:**
```bash
# Pull and merge
git pull origin main

# Or rebase
git pull --rebase origin main
```

### Problem: "Merge conflict"

**Solution:**
```bash
# View conflicts
git status

# Resolve conflicts manually
# Edit conflicted files
# Remove conflict markers

# Stage resolved files
git add .

# Complete merge
git commit
```

### Problem: "Detached HEAD state"

**Solution:**
```bash
# Create branch from current position
git checkout -b new-branch-name

# Or return to main
git checkout main
```

### Problem: "Accidentally committed to main"

**Solution:**
```bash
# Undo commit but keep changes
git reset --soft HEAD~1

# Create feature branch
git checkout -b feature/fix

# Commit again
git commit -m "Proper commit message"
```

### Problem: "Need to change last commit message"

**Solution:**
```bash
git commit --amend -m "New commit message"
```

**Output:**
```
[main 7f8g9h0] New commit message
```

### Problem: "Lost uncommitted changes"

**Solution:**
```bash
# Check reflog
git reflog

# Recover from stash
git stash list
git stash apply stash@{0}
```

### Problem: "Large file accidentally committed"

**Solution:**
```bash
# Remove from history (use with caution)
git filter-branch --tree-filter 'rm -f large-file.zip' HEAD

# Or use BFG Repo-Cleaner (recommended)
# bfg --delete-files large-file.zip
```

---

## Git Flow Workflow

### Overview

Git Flow is a branching model that defines specific branch types and their purposes:

- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/***: New features
- **release/***: Preparation for releases
- **hotfix/***: Critical production fixes

### Setup

```bash
# Initialize Git Flow
git flow init
```

**Interactive setup:**
```
Which branch should be used for bringing forth production releases?
   - main
Branch name for production releases: [main]
Branch name for "next release" development: [develop]

How to name your supporting branch prefixes?
Feature branches? [feature/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []
```

### Feature Development

```bash
# Start feature
git flow feature start shopping-cart

# Work on feature
echo "class Cart { }" > cart.js
git add cart.js
git commit -m "Add cart class"

# Finish feature (merges to develop)
git flow feature finish shopping-cart
```

**Output:**
```
Switched to branch 'develop'
Merge made by the 'three-way' strategy.
 cart.js | 1 +
 1 file changed, 1 insertion(+)
Deleted branch feature/shopping-cart
```

### Release Process

```bash
# Start release
git flow release start v1.2.0

# Make release-specific changes
# Update version numbers, changelog, etc.
git commit -am "Bump version to 1.2.0"

# Finish release (merges to main and develop, creates tag)
git flow release finish v1.2.0
```

**Output:**
```
Switched to branch 'main'
Merge made by the 'three-way' strategy.
Deleted branch release/v1.2.0
Summary of actions:
- Release branch 'release/v1.2.0' has been merged into 'main'
- The release was tagged 'v1.2.0'
- Release branch 'release/v1.2.0' has been back-merged into 'develop'
- You are now on branch 'develop'
```

### Hotfix Process

```bash
# Start hotfix
git flow hotfix start security-patch

# Fix the issue
echo "// Security fix" >> auth.js
git commit -am "Fix security vulnerability"

# Finish hotfix (merges to main and develop, creates tag)
git flow hotfix finish security-patch
```

**Output:**
```
Switched to branch 'main'
Merge made by the 'three-way' strategy.
Deleted branch hotfix/security-patch
Summary of actions:
- Hotfix branch 'hotfix/security-patch' has been merged into 'main'
- The hotfix was tagged 'v1.1.1'
- Hotfix branch 'hotfix/security-patch' has been back-merged into 'develop'
```

---

## Conclusion

This guide covers the essential Git workflows for team collaboration. Remember:

1. **Always pull before starting work**
2. **Use descriptive branch and commit messages**
3. **Communicate with your team**
4. **Review code before merging**
5. **Test thoroughly**
6. **Keep branches focused and small**
7. **Clean up merged branches**

### Quick Reference

```bash
# Daily workflow
git checkout main
git pull origin main
git checkout -b feature/new-feature
# ... make changes ...
git add .
git commit -m "feat: Description"
git push -u origin feature/new-feature
# Create PR, get review, merge

# After merge
git checkout main
git pull origin main
git branch -d feature/new-feature
```

### Additional Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)
- [Git Flow Cheat Sheet](https://danielkummer.github.io/git-flow-cheatsheet/)

---

**Happy collaborating! 🚀**

