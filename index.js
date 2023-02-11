const { context, GitHub } = require("@actions/github");

async function run() {
  const github = new GitHub(process.env.GITHUB_TOKEN);
  const pull_request = context.payload.pull_request;

  const title = pull_request.title;
  const acceptedPrefixes = ["FEATURE", "FIX", "TECH", "DOCS"];

  for (const prefix of acceptedPrefixes) {
    if (title.startsWith(prefix)) {
      console.log(`The pull request title starts with "${prefix}" which is accepted.`);
      return;
    }
  }

  console.log(
      `The pull request title does not start with any of the accepted prefixes: ${acceptedPrefixes.join(
          ", "
      )}.`
  );
  process.exit(1);
}

run();
