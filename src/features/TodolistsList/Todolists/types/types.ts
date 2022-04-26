import { Dispatch } from 'redux';

import { TaskStatuses } from '../../../../enums';
import { TaskType } from '../../Tasks/types';

import { RequestStatusType, SetAppStatusActionType } from 'app/app-reducer';
import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
} from 'features';

export type TodolistsReducerActionsType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>;

export type TodolistsThunkDispatch = Dispatch<
  TodolistsReducerActionsType | SetAppStatusActionType
>;

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type TodolistPropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  demo: boolean;
};

export type TodolistsListPropsType = {
  demo: boolean;
};
