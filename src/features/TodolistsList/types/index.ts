import { Dispatch } from 'redux';

import { TaskType } from '../../../api/types';
import { SetAppErrorActionType, SetAppStatusActionType } from '../../../app/app-reducer';
import { TaskPriorities, TaskStatuses } from '../../../enums';
import {
  addTaskAC,
  removeTaskAC,
  setTasksAC,
  updateTaskAC,
} from '../Tasks/tasksReducer/tasksReducer';
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from '../Todolists/todolistsReducer/todolistsReducer';

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
export type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof setTasksAC>;
export type ThunkDispatch = Dispatch<
  ActionsType | SetAppStatusActionType | SetAppErrorActionType
>;
