import { Dispatch } from 'redux';

import { TodolistsReducerActionsType, TodolistsThunkDispatch } from '../types';

import { todolistsAPI } from 'api/todolistsAPI/todolistsAPI';
import { setAppStatusAC } from 'app';
import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
} from 'features';
import { LoadingStatuses } from 'features/enums';

export const fetchTodolistsTC = () => (dispatch: TodolistsThunkDispatch) => {
  dispatch(setAppStatusAC(LoadingStatuses.Loading));
  todolistsAPI.getTodolists().then((res: any) => {
    dispatch(setTodolistsAC(res.data));
    dispatch(setAppStatusAC(LoadingStatuses.Succeeded));
  });
};
export const removeTodolistTC =
  (todolistId: string) => (dispatch: TodolistsThunkDispatch) => {
    dispatch(setAppStatusAC(LoadingStatuses.Loading));
    dispatch(changeTodolistEntityStatusAC(todolistId, LoadingStatuses.Loading));
    todolistsAPI.deleteTodolist(todolistId).then(() => {
      dispatch(removeTodolistAC(todolistId));
      dispatch(setAppStatusAC(LoadingStatuses.Succeeded));
    });
  };
export const addTodolistTC = (title: string) => (dispatch: TodolistsThunkDispatch) => {
  dispatch(setAppStatusAC(LoadingStatuses.Loading));
  todolistsAPI.createTodolist(title).then((res: any) => {
    dispatch(addTodolistAC(res.data.data.item));
    dispatch(setAppStatusAC(LoadingStatuses.Succeeded));
  });
};
export const changeTodolistTitleTC =
  (todolistId: string, title: string) =>
  (dispatch: Dispatch<TodolistsReducerActionsType>) => {
    todolistsAPI.updateTodolist(todolistId, title).then(() => {
      dispatch(changeTodolistTitleAC(todolistId, title));
    });
  };
