import type { Task } from "../../model"
import "./styles.css"
import TaskCard from "./TaskCard"
import { Actions } from "../../Reducer"
import { Draggable, Droppable } from "@hello-pangea/dnd"

interface Props {
	active: Task[]
	completed: Task[]
	dispatch: React.ActionDispatch<[action: Actions]>
}

const TaskList = (props: Props) => {
	const { dispatch, active, completed } = props
	return (
		<div className="container">
			<Droppable droppableId={"todoList"}>
				{(provided, snapshot) => (
					<div
						className={`tasks${snapshot.isDraggingOver ? " drag-active" : ""}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className="tasks__heading">Active Tasks</span>
						{active.map((task, index) => (
							<Draggable
								key={`active-${task.id}`}
								draggableId={`active-${task.id}`}
								index={index}
							>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<TaskCard
											key={task.id}
											task={task}
											dispatch={dispatch}
											className={snapshot.isDragging ? " drag" : ""}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Droppable droppableId={"completedList"}>
				{(provided, snapshot) => (
					<div
						className={`tasks remove${
							snapshot.isDraggingOver ? " drag-complete" : ""
						}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className="tasks__heading">Completed Tasks</span>
						{completed.map((task, index) => (
							<Draggable
								key={`completed-${task.id}`}
								draggableId={`completed-${task.id}`}
								index={index}
							>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<TaskCard
											key={task.id}
											task={task}
											dispatch={dispatch}
											className={snapshot.isDragging ? " drag" : ""}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	)
}
export default TaskList
