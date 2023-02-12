const { setFailed } = require("@actions/core");
const { context } = require("@actions/github");

async function run() {

  const { payload, eventName } = context;

  if (eventName !== "pull_request") {
    setFailed("This Action only runs on pull_request events.");
  }

  const pullRequestTitle = payload.pull_request.title;

  const allowedPrefixes = ["FEATURE", "FIX", "TECH", "DOCS"];
  const allowedRegex = new RegExp(`^(${allowedPrefixes.join("|")}):`);


  if (!allowedRegex.test(pullRequestTitle)) {
    setFailed("Error: The title must start with one of the following prefixes: FEATURE, FIX, TECH, DOCS");
  } else {
    console.log("The pull request title is valid.");
  }
}

run();

module.exports = run;