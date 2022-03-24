import {FilterType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: TodolistsReducerActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case "ADD-TODOLIST":
            return [{id: v1(), title: action.title, filter: 'all'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            const todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        case "CHANGE-TODOLIST-FILTER":
            const currentTodolist = state.find(t => t.id === action.id)
            if (currentTodolist) {
                currentTodolist.filter = action.filter
            }
            return [...state]
        default:
            throw new Error("I don't understand this type")
    }
}

//ACTIONS
export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title } as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter } as const
}

//TYPES
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type TodolistsReducerActionType = RemoveTodolistActionType
| AddTodolistActionType
| ChangeTodolistTitleActionType
| ChangeTodolistFilterActionType

