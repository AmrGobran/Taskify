import type { Task } from "./model"

export type Actions =
	| { type: "ADD"; payload: string }
	| { type: "REMOVE"; payload: number }
	| { type: "DONE"; payload: number }
	| { type: "EDIT"; payload: { id: number; newTaskValue: string } }
	| { type: "REORDERED"; payload: { active: Task[]; completed: Task[] } }

export const taskReducer = (
	state: { active: Task[]; completed: Task[] },
	action: Actions
) => {
	switch (action.type) {
		case "ADD":
			return {
				...state,
				active: [
					...state.active,
					{
						id: Date.now(),
						todo: action.payload,
						isDone: false,
					},
				],
			}

		case "REMOVE":
			return {
				active: state.active.filter((todo) => todo.id !== action.payload),
				completed: state.completed.filter((todo) => todo.id !== action.payload),
			}

		case "DONE": {
			const todoIndex = state.active.findIndex(
				(todo) => todo.id === action.payload
			)
			if (todoIndex >= 0) {
				const todo = state.active[todoIndex]
				return {
					active: [
						...state.active.slice(0, todoIndex),
						...state.active.slice(todoIndex + 1),
					],
					completed: [...state.completed, { ...todo, isDone: true }],
				}
			} else {
				const completedIndex = state.completed.findIndex(
					(todo) => todo.id === action.payload
				)
				const todo = state.completed[completedIndex]
				return {
					active: [...state.active, { ...todo, isDone: false }],
					completed: [
						...state.completed.slice(0, completedIndex),
						...state.completed.slice(completedIndex + 1),
					],
				}
			}
		}

		case "EDIT":
			return {
				active: state.active.map((todo) =>
					todo.id === action.payload.id
						? { ...todo, todo: action.payload.newTaskValue }
						: todo
				),
				completed: state.completed.map((todo) =>
					todo.id === action.payload.id
						? { ...todo, todo: action.payload.newTaskValue }
						: todo
				),
			}

		case "REORDERED":
			return {
				active: action.payload.active,
				completed: action.payload.completed,
			}

		default:
			return state
	}
}
