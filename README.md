# Taskify: Drag & Drop Task Manager with React.js

## Overview

Taskify is a React.js application built with Vite that allows users to manage tasks using a drag-and-drop interface. It leverages [`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd) (a maintained fork of [`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd)) for smooth task reordering and status toggling between "Active" and "Completed" states.

## Key Features

- **Drag-and-Drop Functionality**  
  Tasks can be dragged between two columns:  
  ✅ **Active** → **Completed**  
  🔄 **Completed** → **Active**  
  (Persists state changes automatically)

- **State Management**  
  Uses React's [`useReducer`](https://react.dev/reference/react/useReducer) hook to centralize task operations:  
  - Add/Edit/Delete tasks  
  - Toggle completion status  
  - Reorder tasks via drag-and-drop

  - Reducer State Structure & Function

```tsx
interface Task {
  id: number
  todo: string
  isDone: boolean
}

type Actions =
  | { type: "ADD"; payload: string }
  | { type: "REMOVE"; payload: number }
  | { type: "DONE"; payload: number }
  | { type: "EDIT"; payload: { id: number; newTaskValue: string } }
  | { type: "REORDERED"; payload: { active: Task[]; completed: Task[] } }

const taskReducer = (
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
        completed: state.complete.map((todo) =>
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
```

- **Intuitive UI**  
  Visual feedback during dragging with [`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd)'s droppable areas.

## Technical Stack

- ⚡ **[Vite](https://vite.dev/)** - Fast build tooling  
- 🏗️ **[React.js](https://react.dev/)** + TypeScript (optional)  
- 🎛️ **[useReducer](https://react.dev/reference/react/useReducer)** - Predictable state updates  
- ✋ **[@hello-pangea/dnd](https://github.com/hello-pangea/dnd)** - Accessible drag-and-drop  

## Why This Stack?

- [`useReducer`](https://react.dev/reference/react/useReducer) simplifies complex state logic compared to [`useState`](https://react.dev/reference/react/useState)  
- [`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd) resolves common issues with the original library (better maintenance + TypeScript support)  
- Vite offers faster dev experience than traditional bundlers
