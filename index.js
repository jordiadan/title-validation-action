const { setFailed } = require("@actions/core");
const { context } = require("@actions/github");

async function run() {
  if (context.eventName !== "pull_request") {
    setFailed("This Action only runs on pull_request events.");
    return;
  }

  const pullRequest = context.payload.pull_request;
  const title = pullRequest.title;

  const allowedPrefixes = ["FEATURE", "FIX", "TECH", "DOCS"];
  const allowedRegex = new RegExp(`^(${allowedPrefixes.join("|")}):`);

  if (!allowedRegex.test(title)) {
    setFailed("Error: The title must start with one of the following prefixes: FEATURE, FIX, TECH, DOCS");
  } else {
    console.log("The pull request title is valid.");
  }
}

module.exports = run;