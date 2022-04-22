import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers : {
        'API-KEY': 'a21b9e11-d6d2-42a0-ae1a-624319f97484'
    },
    withCredentials: true
})



export const taskApi = {
    getTasks(todolistId: any) {
        return instance.get<QueryResultType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: any, title: string) {
        return instance.post<BaseResponseType<QueryResultType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskTitle(todolistId: string, taskId: string, taskTitle: string) {
        return instance.put<BaseResponseType<QueryResultType>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: taskTitle})
    }
}

type TaskType = {
    id: string
    title: string
    description: null
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: null
    deadline: null
    addedDate: string
}

type QueryResultType = {
    items : TaskType[]
    totalCount: number
    error: null | string
}

type BaseResponseType<T = {}> = {
    resultCode: number
    fieldsError: string[]
    messages: string[]
    data: T
}