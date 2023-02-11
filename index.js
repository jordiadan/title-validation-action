const core = require('@actions/core');

async function run() {
  try {
    const repoName = core.getInput('repo-name');

    console.log(process.env.GITHUB_EVENT_NAME)

    const pullRequestTitle = process.env.GITHUB_EVENT_NAME.pull_request.title;

    console.log(`Checking pull request title for repository: ${repoName}`);

    if (!pullRequestTitle.match(/^(FEATURE|FIX|TECH|DOCS)/)) {
      core.setFailed(`The pull request title does not start with FEATURE, FIX, TECH, or DOCS.`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
