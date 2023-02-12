const { setFailed } = require("@actions/core");
const { GitHub, context } = require("@actions/github");

async function run() {

  const { payload, eventName } = context;

  if (eventName !== "pull_request") {
    setFailed("This Action only runs on pull_request events.");
  }

  console.log("Starting action...")
  const pullRequestTitle = payload.pull_request.title;
  console.log("Title: " + pullRequestTitle.title)

  const allowedPrefixes = ["FEATURE", "FIX", "TECH", "DOCS"];
  const allowedRegex = new RegExp(`^(${allowedPrefixes.join("|")}):`);

  if (!allowedRegex.test(pullRequestTitle)) {
    console.log("Error: The title must start with one of the following prefixes: FEATURE, FIX, TECH, DOCS");
    setFailed("Error: The title must start with one of the following prefixes: FEATURE, FIX, TECH, DOCS");
  } else {
    console.log("The pull request title is valid.");
  }
}

module.exports = run;