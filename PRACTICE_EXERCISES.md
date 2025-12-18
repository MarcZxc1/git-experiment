# Git Practice Exercises

This document provides step-by-step exercises to practice Git workflows using this repository.

## Exercise 1: Basic Branch Operations

**Goal:** Understand branch creation, switching, and viewing.

```bash
# 1. View all branches
git branch -a

# 2. Switch to feature/shopping-cart
git checkout feature/shopping-cart

# 3. View the cart.js file
cat src/cart.js

# 4. Switch back to main
git checkout main

# 5. Notice cart.js doesn't exist on main
ls src/
```

**Expected Result:** You should see that `cart.js` exists on `feature/shopping-cart` but not on `main`.

---

## Exercise 2: Fast-Forward Merge

**Goal:** Practice merging a feature branch that's ahead of main.

```bash
# 1. Ensure you're on main
git checkout main

# 2. View the commit graph
git log --oneline --graph --all

# 3. Merge feature/shopping-cart
git merge feature/shopping-cart

# 4. Verify cart.js is now on main
ls src/cart.js

# 5. View the updated graph
git log --oneline --graph --all
```

**Expected Result:** A fast-forward merge occurs, and `cart.js` appears on main.

---

## Exercise 3: Conflict Resolution

**Goal:** Practice resolving merge conflicts.

```bash
# 1. Ensure you're on main
git checkout main

# 2. Try to merge feature/user-authentication
git merge feature/user-authentication
```

**You should see:**
```
Auto-merging src/auth.js
CONFLICT (content): Merge conflict in src/auth.js
Automatic merge failed; fix conflicts and then commit the result.
```

**3. View the conflict:**
```bash
cat src/auth.js
```

**4. Resolve the conflict manually:**
- Open `src/auth.js` in your editor
- You'll see conflict markers: `<<<<<<<`, `=======`, `>>>>>>>`
- Choose the best version or combine both
- Remove the conflict markers

**5. Stage the resolved file:**
```bash
git add src/auth.js
```

**6. Complete the merge:**
```bash
git commit
```

**Expected Result:** Conflict is resolved and merge is complete.

---

## Exercise 4: Rebasing

**Goal:** Practice rebasing a feature branch onto main.

```bash
# 1. Switch to feature/search
git checkout feature/search

# 2. Rebase onto main
git rebase main

# 3. View the linear history
git log --oneline --graph --all
```

**Expected Result:** The feature/search branch is now rebased on top of main with linear history.

---

## Exercise 5: Stashing

**Goal:** Practice stashing uncommitted changes.

```bash
# 1. Switch to feature/shopping-cart
git checkout feature/shopping-cart

# 2. Make some changes
echo "// New feature" >> src/cart.js

# 3. Check status
git status

# 4. Stash the changes
git stash

# 5. Verify changes are stashed
git status

# 6. Switch to main
git checkout main

# 7. Switch back and restore
git checkout feature/shopping-cart
git stash pop
```

**Expected Result:** Changes are temporarily saved and restored.

---

## Exercise 6: Hotfix Workflow

**Goal:** Practice the hotfix workflow.

```bash
# 1. View the hotfix branch
git checkout hotfix/security-patch

# 2. See what was fixed
git diff main src/auth.js

# 3. Merge hotfix to main
git checkout main
git merge hotfix/security-patch

# 4. Create a tag
git tag -a v1.0.1 -m "Security patch release"

# 5. View tags
git tag
```

**Expected Result:** Hotfix is merged and tagged.

---

## Exercise 7: Release Branch

**Goal:** Practice release branch workflow.

```bash
# 1. Checkout release branch
git checkout release/v1.1.0

# 2. View what's in the release
git log --oneline

# 3. Merge to main
git checkout main
git merge release/v1.1.0

# 4. Tag the release
git tag -a v1.1.0 -m "Release version 1.1.0"

# 5. View all tags
git tag -l
```

**Expected Result:** Release is merged and tagged.

---

## Exercise 8: Cherry-Picking

**Goal:** Apply a specific commit to another branch.

```bash
# 1. Find a commit hash from feature/search
git log feature/search --oneline

# 2. Note a commit hash (e.g., dfe658b)

# 3. Switch to main
git checkout main

# 4. Cherry-pick the commit
git cherry-pick dfe658b

# 5. Verify the file exists
ls src/search.js
```

**Expected Result:** The commit is applied to main.

---

## Exercise 9: Interactive Rebase

**Goal:** Practice interactive rebasing to clean up commits.

```bash
# 1. Switch to feature/shopping-cart
git checkout feature/shopping-cart

# 2. Start interactive rebase
git rebase -i HEAD~1

# 3. In the editor, change 'pick' to 'reword' to change commit message
# Save and close

# 4. Enter new commit message when prompted
```

**Expected Result:** Commit message is updated.

---

## Exercise 10: Viewing History

**Goal:** Practice various ways to view Git history.

```bash
# 1. View commit graph
git log --oneline --graph --all --decorate

# 2. View file history
git log --follow src/auth.js

# 3. View changes in a specific commit
git show HEAD

# 4. View diff between branches
git diff main feature/shopping-cart

# 5. View what changed in a file
git log -p src/auth.js
```

**Expected Result:** Various views of the repository history.

---

## Exercise 11: Undoing Changes

**Goal:** Practice different ways to undo changes.

```bash
# 1. Make a change to a file
echo "// Test" >> src/app.js

# 2. Undo uncommitted changes
git checkout -- src/app.js

# 3. Verify change is gone
cat src/app.js

# 4. Make a commit
echo "// Test commit" >> src/app.js
git add src/app.js
git commit -m "Test commit"

# 5. Undo last commit but keep changes
git reset --soft HEAD~1

# 6. Verify changes are still there
git status
```

**Expected Result:** Changes are undone appropriately.

---

## Exercise 12: Reflog Recovery

**Goal:** Practice recovering "lost" commits using reflog.

```bash
# 1. View reflog
git reflog

# 2. Note a previous commit hash

# 3. Checkout that commit
git checkout <commit-hash>

# 4. Create a branch from it
git checkout -b recovered-branch

# 5. Switch back to main
git checkout main
```

**Expected Result:** "Lost" commit is recovered in a new branch.

---

## Exercise 13: Comparing Branches

**Goal:** Practice comparing different branches.

```bash
# 1. Compare main with feature/shopping-cart
git diff main feature/shopping-cart

# 2. See which files differ
git diff --name-only main feature/shopping-cart

# 3. See commits in feature but not in main
git log main..feature/shopping-cart

# 4. See commits in main but not in feature
git log feature/shopping-cart..main
```

**Expected Result:** Clear view of differences between branches.

---

## Exercise 14: Creating a New Feature

**Goal:** Practice the complete feature development workflow.

```bash
# 1. Start from updated main
git checkout main
git pull origin main  # (if you have a remote)

# 2. Create feature branch
git checkout -b feature/notifications

# 3. Create a new file
echo "function sendNotification() { }" > src/notifications.js

# 4. Stage and commit
git add src/notifications.js
git commit -m "feat: Add notification system"

# 5. Push branch (if you have remote)
git push -u origin feature/notifications
```

**Expected Result:** New feature branch with commits.

---

## Exercise 15: Squash Merge

**Goal:** Practice squash merging to combine multiple commits.

```bash
# 1. Ensure feature/shopping-cart has multiple commits
git checkout feature/shopping-cart
git log --oneline

# 2. Switch to main
git checkout main

# 3. Squash merge
git merge --squash feature/shopping-cart

# 4. Commit the squashed changes
git commit -m "feat: Add shopping cart functionality"

# 5. View the clean history
git log --oneline
```

**Expected Result:** All feature commits are combined into one.

---

## Challenge Exercises

### Challenge 1: Resolve Complex Conflict

1. Create two branches from main
2. Modify the same lines in the same file on both branches
3. Try to merge them
4. Resolve the conflict by combining both changes intelligently

### Challenge 2: Git Flow Simulation

1. Create a develop branch
2. Create feature branches from develop
3. Merge features to develop
4. Create release branch from develop
5. Merge release to both main and develop
6. Tag the release

### Challenge 3: Rebase Interactive Cleanup

1. Create a branch with 5 messy commits
2. Use interactive rebase to:
   - Squash some commits
   - Reword commit messages
   - Reorder commits
3. Verify the clean history

---

## Tips for Success

1. **Always check status:** Use `git status` frequently
2. **Visualize history:** Use `git log --oneline --graph --all`
3. **Read error messages:** Git provides helpful hints
4. **Practice conflict resolution:** It's a crucial skill
5. **Experiment safely:** You can always reset or create new branches
6. **Use reflog:** It's your safety net for recovery

---

## Troubleshooting

If something goes wrong:

```bash
# Abort a merge
git merge --abort

# Abort a rebase
git rebase --abort

# Reset to a previous state
git reset --hard HEAD~1  # Careful! This discards changes

# View what went wrong
git status
git log --oneline --graph --all
```

Happy practicing! 🎯

