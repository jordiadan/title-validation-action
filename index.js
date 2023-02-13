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
  const allowedEmojis = ["🚢", "🔍", "❓"];
  const jiraRegex = /SCMI-[0-9]+/;

  if (!allowedRegex.test(pullRequestTitle)) {
    setFailed("Error: The title must start with one of the following prefixes: FEATURE, FIX, TECH, DOCS");
    return;
  }

  const titleParts = pullRequestTitle.split(" ");
  const emoji = titleParts[1];
  const jiraTicket = titleParts[2];

  if (!allowedEmojis.includes(emoji)) {
    setFailed("Error: The title must contain one of the following emojis after the prefix: 🚢, 🔍, ❓");
    return;
  }

  if (!jiraRegex.test(jiraTicket)) {
    setFailed("Error: The title must contain a reference to a JIRA ticket after the emoji, in the format SCMI-12345.");
    return;
  }

  console.log("The pull request title is valid.");
}

run();

module.exports = run;