import {v1} from "uuid";


export const tasksReducer = (state: TasksStateType, action: TasksReducerActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":{
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id !== action.taskId);
            return {...state}
        }
        case "ADD-TASK":{
            let newTask = {id: v1(), title: action.title, isDone: false};
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = [newTask, ...todolistTasks];
            return{...state}
        }
        case "CHANGE-TASK-STATUS":{
            let todolistTasks = state[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            return {...state}
        }
        case "CHANGE-TASK-TITLE":{
            let todolistTasks = state[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title;
            }
            return {...state}
        }
        case "ADD-TODOLIST":{
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST":{
            const stateCopy = {...state};
            delete stateCopy[action.todolistId];
            return stateCopy;
        }
        default:
            throw new Error("I don't understand this type")
    }
}

//ACTIONS
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId, title} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', todolistId: v1(), title} as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}


//TYPES
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

type removeTaskActionType = ReturnType<typeof removeTaskAC>
type addTaskActionType = ReturnType<typeof addTaskAC>
type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>


type TasksReducerActionType = removeTaskActionType
| addTaskActionType
| changeTaskStatusActionType
| changeTaskTitleActionType
| AddTodolistActionType
| RemoveTodolistActionType

