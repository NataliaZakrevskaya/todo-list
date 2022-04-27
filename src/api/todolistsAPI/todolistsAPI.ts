import { AxiosResponse } from 'axios';

import { instance } from '../apiConfig';
import { ResponseType } from '../types';

import { TODO_LISTS } from './constants';

import { TodolistType } from 'features/TodolistsList/Todolists/types';

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>(TODO_LISTS);
  },
  createTodolist(title: string) {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TodolistType }>>
    >(TODO_LISTS, { title });
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
};
