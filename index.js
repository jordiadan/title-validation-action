const { setFailed } = require("@actions/core");
const { context } = require("@actions/github");

const ALLOWED_PREFIXES = ["FEATURE", "FIX", "TECH", "DOCS"];
const ALLOWED_REGEX = new RegExp(`^(${ALLOWED_PREFIXES.join("|")}):`);
const ALLOWED_EMOJIS = ["🚢", "🔍", "❓"];
const JIRA_REGEX = /SCMI-[0-9]+/;

async function validatePullRequestTitle(pullRequestTitle) {
  if (!ALLOWED_REGEX.test(pullRequestTitle)) {
    setFailed(`Error: The title must start with one of the following prefixes: ${ALLOWED_PREFIXES.join(", ")}`);
    return false;
  }

  const titleParts = pullRequestTitle.split(" ");
  const emoji = titleParts[1];
  const jiraTicket = titleParts[2];

  if (!ALLOWED_EMOJIS.includes(emoji)) {
    setFailed(`Error: The title must contain one of the following emojis after the prefix: ${ALLOWED_EMOJIS.join(", ")}`);
    return false;
  }

  if (!JIRA_REGEX.test(jiraTicket)) {
    setFailed("Error: The title must contain a reference to a JIRA ticket after the emoji, in the format SCMI-12345.");
    return false;
  }

  return true;
}

async function run() {
  const { payload, eventName } = context;

  if (eventName !== "pull_request") {
    setFailed("This Action only runs on pull_request events.");
    return;
  }

  const pullRequestTitle = payload.pull_request.title;
  const isValid = await validatePullRequestTitle(pullRequestTitle);

  if (isValid) {
    console.log("The pull request title is valid.");
  }
}

run();

module.exports = run;