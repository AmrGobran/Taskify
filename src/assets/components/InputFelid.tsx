import { useRef } from "react"
import "./styles.css"

interface Props {
	task: string
	setTask: React.Dispatch<React.SetStateAction<string>>
	handleAddTask: (e: React.FormEvent) => void
}

const InputFelid = (props: Props) => {
	const { task, setTask, handleAddTask } = props
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<form
			className={"input"}
			onSubmit={(e) => {
				handleAddTask(e)
				inputRef.current?.blur()
			}}
		>
			<input
				type="text"
				ref={inputRef}
				placeholder={"Enter a task"}
				value={task}
				onChange={(e) => setTask(e.target.value)}
				className={"input__box"}
			/>
			<button className={"input__submit"} type={"submit"}>
				Go
			</button>
		</form>
	)
}
export default InputFelid
