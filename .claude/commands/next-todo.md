---
description: Claim the next unstarted todo in docs/todo, implement it, and mark it done
---

Work on exactly ONE todo from `docs/todo/`, then stop.

## 1. Pick the todo

- List `docs/todo/*.md` (ignore `README.md`).
- Skip any file whose name starts with `NN-pending-` or `NN-done-`. Pending todos are being worked on by another session; don't touch them.
- Pick the remaining file with the **lowest number prefix**. That's your todo.
- If nothing is left, say "No unstarted todos remain" and stop. List any `-pending-` files so I can see what's still in progress.

## 2. Claim it before doing anything else

Rename it right away so a parallel session doesn't pick the same one:
`NN-slug.md` → `NN-pending-slug.md` (use `git mv` if the file is tracked; otherwise a plain rename).

Update the link for that item in `docs/todo/README.md`'s index table so it points to the new filename.

Then re-list the directory. If another `NN-pending-slug.md` with the same number now exists, or your rename failed, another session got there first: go back to step 1.

Once the claim holds, rename this chat to `todo NN · pending` (e.g. `todo 07 · pending`) with the `set_session_title` tool (`session_id: "self"`; load it with ToolSearch if it's deferred). Use the item's number prefix. If the tool isn't available, skip this and mention it in your report.

### Chat status

Keep the chat title at `todo NN · <status>` and update it whenever the status changes:

- `pending`: claimed and in progress, or left unfinished with a `## Blockers` section waiting on a decision, a dependency, or a fix.
- `stale`: the todo no longer applies: it can't be reproduced, is already implemented or fixed, or was superseded. Add a `## Blockers` section saying what you found, leave the file as `-pending-`, and report back.
- `done`: finished, verified, and renamed to `NN-done-slug.md`.

## 3. Do the work

- Read the whole todo file: **Why**, **What to build**, **UX notes**, **Acceptance criteria**.
- Follow `CLAUDE.md` and this project's conventions. Look at sibling controllers, pages and tests before writing new code, and reuse what's already there.
- Implement everything the todo asks for. Stay inside its scope. If you notice unrelated issues, note them in your summary and don't fix them.
- If the todo depends on another todo that isn't done yet, or needs a decision only I can make, stop. Leave the file as `-pending-`, add a `## Blockers` section to it explaining why, keep the chat title at `todo NN · pending`, and report back. If the todo turns out to be already implemented or superseded, set the title to `todo NN · stale` instead.
- Add or update tests that cover the acceptance criteria, then run them along with any related existing tests. Run the formatter/linter the project uses (e.g. Pint, ESLint/Prettier) on the files you changed.

## 4. Verify against the acceptance criteria

Go through every acceptance criterion and confirm it's met: by a passing test, by checking it in the browser preview for UI changes, or by citing where it's handled in the code. Don't mark the todo done while any criterion is unmet or tests are failing.

## 5. Mark it done

- Add a `## Completion notes` section at the bottom of the todo file with: the date, a short summary of what was built, the key files changed, the tests added and run, and any follow-ups or deviations from the plan.
- Rename `NN-pending-slug.md` → `NN-done-slug.md` and update the README index link to match.
- Set the chat title to `todo NN · done` with `set_session_title`.
- Don't commit or push unless I ask.

## 6. Report

Give a short summary: which todo you took, what was built, test results, every acceptance criterion with ✅ or ❌, and any follow-ups.
