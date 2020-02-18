import React from "react";
import { Meteor } from "meteor/meteor";
import { Tasks } from "../api/tasks";

const Task = props => {
	const task = props.task;

	const toggleChecked = () => {
		Meteor.call("tasks.setChecked", task._id, !task.checked);
	};

	const deleteThisTask = () => Meteor.call("tasks.remove", task._id);

	const taskClassName = task.checked ? "checked" : "";

	return (
		<li className={taskClassName}>
			<button className="delete" onClick={deleteThisTask}>
				&times;
			</button>

			<input
				type="checkbox"
				readOnly
				checked={!!task.checked}
				onClick={toggleChecked}
			/>

			<span className="text">
				<strong>{task.username}</strong>:{task.text}
			</span>
		</li>
	);
};

export default Task;
