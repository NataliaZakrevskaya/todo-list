import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers : {
        'API-KEY': 'a21b9e11-d6d2-42a0-ae1a-624319f97484'
    },
    withCredentials: true
})



export const todolistApi = {
    getTodos() {
        return instance.get<TodoType[]>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<BaseResponseType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<BaseResponseType, AxiosResponse<BaseResponseType>, {title: string}>(`todo-lists/${todolistId}`, {title})
    }
}

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type BaseResponseType<T = {}> = {
    resultCode: number
    fieldsError: string[]
    messages: string[]
    data: T
}
