import { AxiosResponse } from 'axios';

import { instance } from '../apiConfig';
import { GetTasksResponse, UpdateTaskModelType, ResponseType } from '../types';

import { TaskType } from 'features/TodolistsList/Tasks/types';
import { TodolistType } from 'features/TodolistsList/Todolists/types/types';

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists');
  },
  createTodolist(title: string) {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TodolistType }>>
    >('todo-lists', { title });
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(id: string, title: string) {
    return instance.put<{ title: string }, AxiosResponse<ResponseType>>(
      `todo-lists/${id}`,
      { title },
    );
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`todo-lists/${todolistId}/tasks`, { title });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<
      UpdateTaskModelType,
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};
