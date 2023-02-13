const { setFailed } = require("@actions/core");
const { context } = require("@actions/github");

async function run() {

  const { payload, eventName } = context;

  if (eventName !== "pull_request") {
    setFailed("This Action only runs on pull_request events.");
    return;
  }

  const pullRequestTitle = payload.pull_request.title;

  const allowedPrefixes = ["FEATURE", "FIX", "TECH", "DOCS"];
  const allowedRegex = new RegExp(`^(${allowedPrefixes.join("|")}):`);


  if (!allowedRegex.test(pullRequestTitle)) {
    setFailed("Error: The title must start with one of the following prefixes: FEATURE, FIX, TECH, DOCS");
    return;
  }

  const jiraTicketRegex = /SCMI-[0-9]+/;
  if (!jiraTicketRegex.test(pullRequestTitle)) {
    setFailed("Error: The title must contain a reference to a JIRA ticket after the prefix, in the format SCMI-12345.");
    return;
  }

  console.log("The pull request title is valid.");
}

run();

module.exports = run;