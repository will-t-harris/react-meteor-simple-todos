import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import { Tasks } from "../api/tasks";

import Task from "./Task.js";
import AccountsUIWrapper from "./AccountsUIWrapper";

const App = props => {
	const [input, setInput] = useState("");
	const [hideCompleted, setHideCompleted] = useState(false);

	const renderTasks = () => {
		let filteredTasks = props.tasks;
		if (hideCompleted) {
			filteredTasks = filteredTasks.filter(task => !task.checked);
		}
		return filteredTasks.map(task => <Task key={task._id} task={task} />);
	};

	const handleSubmit = event => {
		event.preventDefault();

		const text = input;

		Tasks.insert({
			text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});

		setInput("");
	};

	const toggleHideCompleted = () => {
		setHideCompleted(!hideCompleted);
	};

	return (
		<div className="container">
			<header>
				<h1>Todo List {props.incompleteCount}</h1>

				<label className="hide-completed">
					<input
						type="checkbox"
						readOnly
						checked={hideCompleted}
						onClick={toggleHideCompleted}
					/>
					Hide Completed Tasks
				</label>

				<AccountsUIWrapper />

				{props.currentUser ? (
					<form className="new-task" onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Type to add new tasks"
							value={input}
							onChange={event => setInput(event.target.value)}
						/>
					</form>
				) : (
					<h2 style={{ fontSize: "14px" }}>Login To Add Tasks</h2>
				)}
			</header>

			<ul>{renderTasks()}</ul>
		</div>
	);
};

export default withTracker(() => {
	return {
		tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
		incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
		currentUser: Meteor.user()
	};
})(App);
