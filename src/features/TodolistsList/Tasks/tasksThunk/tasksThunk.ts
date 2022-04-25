import { Dispatch } from 'redux';

import { todolistsAPI } from '../../../../api/todolistsAPI/todolistsAPI';
import { UpdateTaskModelType } from '../../../../api/types';
import {
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from '../../../../app/app-reducer';
import { AppRootStateType } from '../../../../app/store';
import { ResultCodes } from '../../../../enums';
import { handleServerAppError, handleServerNetworkError } from '../../../../utils';
import { LoadingStatuses } from '../../../enums/enums';
import { ActionsType, ThunkDispatch, UpdateDomainTaskModelType } from '../../types';
import {
  addTaskAC,
  removeTaskAC,
  setTasksAC,
  updateTaskAC,
} from '../tasksReducer/tasksReducer';

export const fetchTasksTC =
  (todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC(LoadingStatuses.Loading));
    todolistsAPI.getTasks(todolistId).then(res => {
      const tasks = res.data.items;
      dispatch(setTasksAC(tasks, todolistId));
      dispatch(setAppStatusAC(LoadingStatuses.Succeeded));
    });
  };
export const removeTaskTC =
  (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId).then(() => {
      dispatch(removeTaskAC(taskId, todolistId));
    });
  };
export const addTaskTC =
  (title: string, todolistId: string) =>
  (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
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
  (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId);
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
