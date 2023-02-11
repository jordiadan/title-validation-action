const { GitHub, context } = require("@actions/github");
const core = require("@actions/core");

async function run() {
  const { payload, eventName } = context;

  if (eventName !== "pull_request") {
    core.setFailed("This Action only runs on pull_request events.");
  }

  const allowedPrefixes = ["FEATURE", "FIX", "TECH", "DOCS"];
  const pullRequestTitle = payload.pull_request.title;

  const prefix = pullRequestTitle.split(" ")[0];
  if (!allowedPrefixes.includes(prefix)) {
    core.setFailed(
        `Error: The title must start with one of the following prefixes: ${allowedPrefixes.join(
            ", "
        )}`
    );
  }

  console.log("The pull request title is valid.");
}

run();