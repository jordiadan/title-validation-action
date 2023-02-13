const { setFailed } = require("@actions/core");
const { context } = require("@actions/github");

const run = require("./index");

jest.mock("@actions/core");
jest.mock("@actions/github", () => ({
    context: {
        payload: {
            pull_request: {
                title: ""
            }
        },
        eventName: ""
    }
}));

describe("run", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should setFailed if the eventName is not 'pull_request'", () => {
        context.eventName = "not_pull_request";
        run();
        expect(setFailed).toHaveBeenCalledWith("This Action only runs on pull_request events.");
    });

    it("should setFailed if the pull request title does not start with an allowed prefix", () => {
        context.eventName = "pull_request";
        context.payload.pull_request.title = "INVALID TITLE";
        run();
        expect(setFailed).toHaveBeenCalledWith("Error: The title must start with one of the following prefixes: FEATURE, FIX, TECH, DOCS");
    });

    it("fails if the pull request title does not contain a JIRA ticket reference after the prefix", () => {
        context.eventName = "pull_request";
        context.payload.pull_request.title = "FEATURE: This is an invalid pull request title without a JIRA ticket reference";
        run();
        expect(setFailed).toHaveBeenCalledWith("Error: The title must contain a reference to a JIRA ticket after the prefix, in the format SCMI-12345.");
    });

    it("should not setFailed if the pull request title starts with an allowed prefix", () => {
        context.eventName = "pull_request";
        context.payload.pull_request.title = "FEATURE: SCMI-12345 Add new button to home page";
        run();
        expect(setFailed).not.toHaveBeenCalled();
    });
});