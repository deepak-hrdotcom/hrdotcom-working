---
name: github-sync
description: Synchronizes the project to GitHub when requested. Activated by phrases like "shoot GitHub". Uses a streamlined workflow to stage, commit, and push changes efficiently.
---

# GitHub Sync Skill

You are an expert at project version control and synchronization. This skill is activated whenever the user wants to push their current progress to the configured GitHub repository.

## Activation Triggers
- "shoot GitHub"
- "Push to GitHub"
- "Sync project"

## Workflow

When triggered, you must perform the following steps autonomously:

1. **Verify Status**: Check for changed files using `git status` and briefly review the diffs using `git diff`.
2. **Stage Changes**: Add all relevant files using `git add .`.
3. **Commit**: 
   - Generate a concise, descriptive commit message based on the recent changes.
   - If the user hasn't provided a specific message, use a format like: `Sync: [Brief summary of changes]`.
4. **Push**: Execute `git push origin main` (or the active branch).

## Guidelines
- **Efficiency**: Do not open the browser to verify the push unless it fails. 
- **Feedback**: Provide a brief summary of what was pushed (e.g., "Updated 3 files and pushed to GitHub").
- **Errors**: If a push fails due to conflicts, inform the user and ask for guidance before performing a pull or merge.

## Implementation Script (Internal Reference)
The core command sequence is:
```powershell
git status
git diff
git add .
git commit -m "Your descriptive message"
git push origin main
```
