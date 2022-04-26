import { Dispatch } from 'redux';

import { LoadingStatuses } from '../../../enums';
import {
  TasksReducerActionsType,
  TasksThunkDispatch,
  TaskType,
  UpdateDomainTaskModelType,
} from '../types';

import { todolistsAPI } from 'api/todolistsAPI/todolistsAPI';
import { UpdateTaskModelType } from 'api/types';
import {
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from 'app/app-reducer';
import { AppRootStateType } from 'app/store';
import { ResultCodes } from 'enums';
import { addTaskAC, removeTaskAC, setTasksAC, updateTaskAC } from 'features';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const fetchTasksTC =
  (todolistId: string) =>
  (dispatch: Dispatch<TasksReducerActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC(LoadingStatuses.Loading));
    todolistsAPI.getTasks(todolistId).then(res => {
      const tasks = res.data.items;
      dispatch(setTasksAC(tasks, todolistId));
      dispatch(setAppStatusAC(LoadingStatuses.Succeeded));
    });
  };
export const removeTaskTC =
  (taskId: string, todolistId: string) =>
  (dispatch: Dispatch<TasksReducerActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId).then(() => {
      dispatch(removeTaskAC(taskId, todolistId));
    });
  };
export const addTaskTC =
  (title: string, todolistId: string) =>
  (
    dispatch: Dispatch<
      TasksReducerActionsType | SetAppErrorActionType | SetAppStatusActionType
    >,
  ) => {
    dispatch(setAppStatusAC(LoadingStatuses.Loading));
    todolistsAPI
      .createTask(todolistId, title)
      .then(res => {
        if (res.data.resultCode === ResultCodes.Success) {
          const task = res.data.data.item;
          dispatch(addTaskAC(task));
          dispatch(setAppStatusAC(LoadingStatuses.Succeeded));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const updateTaskTC =
  (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
  (dispatch: TasksThunkDispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistId].find((tasks: TaskType) => tasks.id === taskId);
    if (!task) {
      // throw new Error("task not found in the state");
      console.warn('task not found in the state');
      return;
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    };

    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then(res => {
        if (res.data.resultCode === ResultCodes.Success) {
          dispatch(updateTaskAC(taskId, domainModel, todolistId));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };
