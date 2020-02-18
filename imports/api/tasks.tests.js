import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { assert } from "chai";
import { Tasks } from "./tasks";

if (Meteor.isServer) {
	describe("Tasks", () => {
		describe("methods", () => {
			const userId = Random.id();
			let taskId;

			beforeEach(() => {
				Tasks.remove({});
				taskId = Tasks.insert({
					text: "test task",
					createdAt: new Date(),
					owner: userId,
					username: "muwumpus"
				});
			});
			it("can delete owned task", () => {
				// find internal implementation of task method to test in isolation
				const deleteTask = Meteor.server.method_handlers["tasks.remove"];
				// set up a fake method invocation to look like what the method expects
				const invocation = { userId };
				// run with `this` set to the fake invocation
				deleteTask.apply(invocation, [taskId]);
				// assert that what we expect is true
				assert.equal(Tasks.find().count(), 0);
			});
		});
	});
}
