import React from "react";
import { Meteor } from "meteor/meteor";
import classnames from "classnames";

const Task = props => {
	const task = props.task;

	const toggleChecked = () => {
		Meteor.call("tasks.setChecked", task._id, !task.checked);
	};

	const deleteThisTask = () => Meteor.call("tasks.remove", task._id);

	const togglePrivate = () =>
		Meteor.call("tasks.setPrivate", task._id, !task.private);

	const taskClassName = classnames({
		checked: task.checked,
		private: task.private
	});

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

			{props.showPrivateButton ? (
				<button className="toggle-private" onClick={togglePrivate}>
					{task.private ? "Private" : "Public"}
				</button>
			) : (
				""
			)}

			<span className="text">
				<strong>{task.username}</strong>:{task.text}
			</span>
		</li>
	);
};

export default Task;
