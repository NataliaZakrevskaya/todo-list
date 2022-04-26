import { TaskPriorities, TaskStatuses } from 'enums';
import { TaskType } from 'features/TodolistsList/Tasks/types';

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export type MeResponseType = {
  id: number;
  email: string;
  login: string;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
