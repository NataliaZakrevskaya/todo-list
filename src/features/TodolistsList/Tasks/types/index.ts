import { Dispatch } from 'redux';

import {
  SetAppErrorActionType,
  SetAppStatusActionType,
} from '../../../../app/app-reducer';
import { TaskPriorities, TaskStatuses } from '../../../../enums';
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from '../../Todolists';
import { addTaskAC, removeTaskAC, setTasksAC, updateTaskAC } from '../tasksReducer';

export type TasksReducerActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof setTasksAC>;
export type TasksThunkDispatch = Dispatch<
  TasksReducerActionsType | SetAppStatusActionType | SetAppErrorActionType
>;

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

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
export type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
};
