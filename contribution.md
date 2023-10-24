# Commit conventions

In this project we will use the conventional commits specification to make our commits more readable and understandable. The documentation for this can be found [here](https://www.conventionalcommits.org/en/v1.0.0/).

The most important rules will be listed below:

- Commits must be prefixed with a type, which consists of a noun, `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore` or `revert`, followed by a colon and a space.
- The commit message must be written in all lowercase letters, with the exception of words that refer to names or code.
- The commit message must not end with a period.
- The commit message must be written in the imperative, present tense: "change" not "changed" nor "changes".
- The commit message must be written in English.
- If there has been cooperation in the commit, the commit must end with a `Co-authored-by: {name}` line.

In addition to the above rules, the commit message must have a reference to the issue number at the footer of the commit message, in this format: `#1`, where `1` is the issue number.

There can also be an optional body to the commit message, which can be used to explain the commit in more detail.

### Example commit

```
feat: add pagination component

#1

Co-authored-by: John Doe
```

---

# Issues

For every programming task, there must be an issue created in the GitHub repository. The issue must be assigned to the person who will be working on the task. The issue must have a title and a description, both in english. The title should be a short description of the task.

The description should be a more thorough explanation of the task, and should include what the issue needs to be done. The description should also include a list of acceptance criteria, which are a list of requirements that must be met for the task to be considered complete.

### Labels

The issues should be labeled with the following labels:

- `bug`: The issue is a bug that needs to be fixed.
- `docs`: The issue is a documentation task.
- `feat`: The issue is a new feature that needs to be implemented.
- `refactor`: The issue is a refactoring task.
- `frontend`: The issue is a frontend task.
- `backend`: The issue is a backend task.
- `status::backlog`: The issue is in the backlog.`
- `status::selected for development`: The issue has been selected for development.
- `status::in progress`: The issue is currently being worked on.
- `status::in review`: The issue is currently being reviewed.

---

# Merge request

When a task is complete, a merge request must be created. The merge request must be assigned to the person who will be reviewing the merge request. The merge request must have a title and a description, both in english. The title should be a short description of the task, and it may be the same as the commit message.

Before merging, the merge request must be reviewed by another person. The reviewer must check that the code follows the coding conventions, and that the code works as intended. The reviewer must also check that the merge request follows the commit conventions. If the reviewer finds any issues, there must be made a made comments on the code and open threads. The threads must be closed by the person who started the thread. All threads must be resolved before the merge request can be merged.

When merging, the branch must be rebased onto the `main` branch to resolve all possible conflicts, and also to keep a clean commit history.

The merge request must be merged using the `Squash commits` option, to keep a clean commit history. Has there been several people working on a merge request, the merge commit must contain their names in a list, in the following format: `Co-authored-by: {name}`. The merge commit must also be on the format specified in the commit conventions.
