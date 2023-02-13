# GitHub Action for Validating Pull Request Titles

This GitHub Action checks if the title of a pull request meets specific criteria. The criteria include:

* The title must start with one of the following prefixes: `FEATURE`, `FIX`, `TECH`, or `DOCS`
* The title must contain one of the following emojis after the prefix: 🚢, 🔍, or ❓
* The title must contain a reference to a JIRA ticket after the emoji, in the format `SCMI-12345`.

## Output
If the pull request title is valid, the Action will log The pull request title is valid.

If the pull request title is invalid, the Action will set the status of the Action to failed and log an error message indicating which criteria was not met.

## Example
Here's an example workflow that uses this Action:

```
name: Pull Request Title Validation

on:
pull_request:
types: [opened, edited, synchronize]

jobs:
validate-pull-request-title:
runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Validate Pull Request Title
      uses: <YOUR_GITHUB_USERNAME>/pull-request-title-validation-action@<TAG_OR_BRANCH_NAME>
      with:
        # Optional parameters go here
```

Replace `<YOUR_GITHUB_USERNAME>` with your Github username, and `<TAG_OR_BRANCH_NAME>` with the tag or branch of the Action you want to use.