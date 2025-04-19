import { useReducer, useState } from "react"
import "./App.css"
import InputFelid from "./assets/components/InputFelid"
import TaskList from "./assets/components/TaskList"
import { taskReducer } from "./Reducer"
import { DragDropContext, type DropResult } from "@hello-pangea/dnd"

const App: React.FC = () => {
	const [task, setTask] = useState<string>("")
	const [state, dispatch] = useReducer(taskReducer, {
		active: [],
		completed: [],
	})

	const handleAddTask = (e: React.FormEvent) => {
		e.preventDefault()

		if (task) {
			dispatch({ type: "ADD", payload: task })
			setTask("")
		}

		console.log("todo", task, "state", state)
	}

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result

		if (
			!destination ||
			(source.droppableId === destination.droppableId &&
				source.index === destination.index) ||
			source.droppableId === destination.droppableId
		) {
			return
		}

		const sourceList =
			source.droppableId === "todoList"
				? [...state.active]
				: [...state.completed]
		const destList =
			destination.droppableId === "todoList"
				? [...state.active]
				: [...state.completed]

		const [movedItem] = sourceList.splice(source.index, 1)

		const itemToInsert =
			source.droppableId !== destination.droppableId
				? { ...movedItem, isDone: !movedItem.isDone }
				: movedItem

		destList.splice(destination.index, 0, itemToInsert)

		dispatch({
			type: "REORDERED",
			payload: {
				active: source.droppableId === "todoList" ? sourceList : destList,
				completed:
					source.droppableId === "completedList" ? sourceList : destList,
			},
		})
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={"App"}>
				<span className={"heading"}>Taskify</span>
				<InputFelid
					task={task}
					setTask={setTask}
					handleAddTask={handleAddTask}
				/>
				<TaskList
					dispatch={dispatch}
					active={state.active}
					completed={state.completed}
				/>
			</div>
		</DragDropContext>
	)
}

export default App
