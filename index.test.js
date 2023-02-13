const {setFailed} = require("@actions/core");
const {context} = require("@actions/github");

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

    it("fails if event is not a pull request", () => {
        context.eventName = "not_a_pull_request";
        run();
        expect(setFailed).toHaveBeenCalledWith("This Action only runs on pull_request events.");
    });

    it("fails if pull request title does not start with an allowed prefix", () => {
        context.eventName = "pull_request";
        context.payload.pull_request.title = "NOTALLOWED: SCMI-12345 Add new button to home page";
        run();
        expect(setFailed).toHaveBeenCalledWith("Error: The title must start with one of the following prefixes: FEATURE, FIX, TECH, DOCS");
    });

    it("fails if pull request title does not contain ship, show or ask emojis", () => {
        context.eventName = "pull_request";
        context.payload.pull_request.title = "FEATURE: SCMI-12345 Add new button to home page";
        run();
        expect(setFailed).toHaveBeenCalledWith("Error: The title must contain one of the following emojis after the prefix: 🚢, 🔍, ❓");
    });

    it("fails if pull request title does not contain a JIRA ticket", () => {
        context.eventName = "pull_request";
        context.payload.pull_request.title = "FEATURE: 🚢 No JIRA ticket Add new button to home page";
        run();
        expect(setFailed).toHaveBeenCalledWith("Error: The title must contain a reference to a JIRA ticket after the emoji, in the format SCMI-12345.");
    });

    it("passes if pull request title is valid", () => {
        context.eventName = "pull_request";
        context.payload.pull_request.title = "FEATURE: 🚢 SCMI-12345 Add new button to home page";
        run();
        expect(setFailed).not.toHaveBeenCalled();
    });
});