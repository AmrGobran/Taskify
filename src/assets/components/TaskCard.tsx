import { useEffect, useRef, useState } from "react"
import type { Task } from "../../model"
import { CiEdit } from "react-icons/ci"
import { MdDelete, MdOutlineDone } from "react-icons/md"
import { LuUndo2 } from "react-icons/lu"
import type { Actions } from "../../Reducer"

interface Props {
	task: Task
	dispatch: React.ActionDispatch<[action: Actions]>
	className: string
}

const TaskCard = (props: Props) => {
	const { task, dispatch, className } = props
	const [edit, setEdit] = useState<boolean>(false)
	const [taskValue, setTodoValue] = useState<string>(task.todo)

	const inputRef = useRef<HTMLInputElement>(null)

	const handleEditSubmit = (e: React.FormEvent, id: number) => {
		e.preventDefault()
		dispatch({ type: "EDIT", payload: { id, newTaskValue: taskValue } })
		setEdit(false)
	}

	const handleDoneBtn = (id: number) => {
		if (edit) return
		dispatch({ type: "DONE", payload: id })
	}

	const handleDeleteBtn = (id: number) => {
		dispatch({ type: "REMOVE", payload: id })
	}

	const handleEditBtn = () => {
		if (!edit && !task.isDone) {
			setEdit(true)
		} else if (edit) setEdit(false)
	}

	useEffect(() => {
		inputRef.current?.focus()
	}, [edit])

	return (
		<form
			className={`tasks__single${className ? className : ""}`}
			onSubmit={(e) => handleEditSubmit(e, task.id)}
		>
			{edit ? (
				<input
					ref={inputRef}
					value={taskValue}
					onChange={(e) => setTodoValue(e.target.value)}
					className={"tasks__single__text"}
				/>
			) : (
				<span
					className={`tasks__single__text ${
						task.isDone ? " line-through" : ""
					}`}
				>
					{task.todo}
				</span>
			)}

			<div>
				<span className="icon" onClick={() => handleEditBtn()}>
					<CiEdit />
				</span>
				<span className="icon" onClick={() => handleDeleteBtn(task.id)}>
					<MdDelete />
				</span>
				<span className="icon" onClick={() => handleDoneBtn(task.id)}>
					{task.isDone ? <LuUndo2 /> : <MdOutlineDone />}
				</span>
			</div>
		</form>
	)
}
export default TaskCard
