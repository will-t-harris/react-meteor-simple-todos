import React, { useState } from "react";
import { withTracker } from "meteor/react-meteor-data";

import { Tasks } from "../api/tasks";

import Task from "./Task.js";

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
			createdAt: new Date()
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

				<form className="new-task" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Type to add new tasks"
						value={input}
						onChange={event => setInput(event.target.value)}
					/>
				</form>
			</header>

			<ul>{renderTasks()}</ul>
		</div>
	);
};

export default withTracker(() => {
	return {
		tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
		incompleteCount: Tasks.find({ checked: { $ne: true } }).count()
	};
})(App);
