const { GitHub, context } = require("@actions/github");

async function run() {
  const { payload, eventName } = context;

  if (eventName !== "pull_request") {
    console.log("This Action only runs on pull_request events.");
    return;
  }

  const allowedPrefixes = ["FEATURE", "FIX", "TECH", "DOCS"];
  const pullRequestTitle = payload.pull_request.title;

  const prefix = pullRequestTitle.split(" ")[0];
  if (!allowedPrefixes.includes(prefix)) {
    console.log(
        `Error: The title must start with one of the following prefixes: ${allowedPrefixes.join(
            ", "
        )}`
    );
    return;
  }

  console.log("The pull request title is valid.");
}

run();