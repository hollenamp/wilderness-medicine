---
description: Claim the next unfixed bug in docs/bugs, fix it, and mark it done
---

Fix exactly ONE bug from `docs/bugs/`, then stop.

## 1. Pick the bug

- List `docs/bugs/*.md` (ignore `README.md`).
- Skip any file whose name starts with `NN-pending-` or `NN-done-`. Pending bugs are being worked on by another session; don't touch them.
- Pick the remaining file with the **lowest number prefix**. That's your bug.
- If its **What to fix** says another bug has to be fixed first (e.g. 01 needs 02) and that bug isn't `-done-` yet, skip it and take the next lowest instead.
- If nothing is left, say "No unfixed bugs remain" and stop. List any `-pending-` files so I can see what's still in progress.

## 2. Claim it before doing anything else

Rename it right away so a parallel session doesn't pick the same one:
`NN-slug.md` → `NN-pending-slug.md` (use `git mv` if the file is tracked; otherwise a plain rename).

Update the link for that bug in `docs/bugs/README.md`'s index table so it points to the new filename. Also update any links to it from the other bug files and the README's verdict and deploy checklist.

Then re-list the directory. If another `NN-pending-slug.md` with the same number now exists, or your rename failed, another session got there first: go back to step 1.

Once the claim holds, rename this chat to `bug NN · pending` (e.g. `bug 07 · pending`) with the `set_session_title` tool (`session_id: "self"`; load it with ToolSearch if it's deferred). Use the item's number prefix. If the tool isn't available, skip this and mention it in your report.

### Chat status

Keep the chat title at `bug NN · <status>` and update it whenever the status changes:

- `pending`: claimed and in progress, or left unfinished with a `## Blockers` section waiting on a decision, a dependency, or a fix.
- `stale`: the bug no longer applies: it can't be reproduced, is already implemented or fixed, or was superseded. Add a `## Blockers` section saying what you found, leave the file as `-pending-`, and report back.
- `done`: finished, verified, and renamed to `NN-done-slug.md`.

## 3. Reproduce it

- Read the whole bug file: **Why** (the evidence), **What to fix**, **Acceptance criteria**.
- Confirm the bug still happens before changing anything: run the failing test or command quoted in **Why**, or write a test that fails because of it. If you can't reproduce it, stop. Leave the file as `-pending-`, add a `## Blockers` section with what you tried and what you saw, set the chat title to `bug NN · stale`, and report back.

## 4. Fix it

- Follow `CLAUDE.md` and this project's conventions. Look at sibling code and tests before writing new code, and reuse what's already there.
- Make the fix the bug file describes. Keep it to the smallest change that fixes the root cause. If you notice unrelated issues, note them in your summary and don't fix them.
- If the fix needs a decision only I can make (data loss, production data, changing an already-run migration, access changes), stop. Leave the file as `-pending-`, add a `## Blockers` section explaining the decision, keep the chat title at `bug NN · pending`, and report back.
- Add a regression test that fails without the fix and passes with it, unless the bug file says why a test isn't possible. Run it along with the related existing tests. Run the formatter/linter the project uses (e.g. Pint, ESLint/Prettier, `tsc`) on the files you changed.

## 5. Verify against the acceptance criteria

Go through every acceptance criterion and confirm it's met: by a passing test, by running the command it names, by checking it in the browser preview for UI changes, or by citing where it's handled in the code. Tick each `- [ ]` box you've confirmed (`- [x]`). Don't mark the bug done while any criterion is unmet or tests are failing.

## 6. Mark it done

- Add a `## Fix notes` section at the bottom of the bug file with: the date, the root cause in a sentence or two, what you changed, the key files changed, the tests added and run, and any follow-ups or deviations from **What to fix**.
- Rename `NN-pending-slug.md` → `NN-done-slug.md` and update the README index link (and any other links) to match.
- Set the chat title to `bug NN · done` with `set_session_title`.
- Don't commit or push unless I ask.

## 7. Report

Give a short summary: which bug you took, the root cause, what you changed, test results, every acceptance criterion with ✅ or ❌, whether it still blocks the deploy, and any follow-ups.
