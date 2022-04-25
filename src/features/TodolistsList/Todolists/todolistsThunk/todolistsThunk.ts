import { Dispatch } from 'redux';

import { todolistsAPI } from '../../../../api/todolistsAPI/todolistsAPI';
import { setAppStatusAC } from '../../../../app';
import { LoadingStatuses } from '../../../enums/enums';
import { ActionsType } from '../../types';
import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
} from '../todolistsReducer/todolistsReducer';
import { ThunkDispatch } from '../types/types';

export const fetchTodolistsTC = () => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC(LoadingStatuses.Loading));
  todolistsAPI.getTodolists().then(res => {
    dispatch(setTodolistsAC(res.data));
    dispatch(setAppStatusAC(LoadingStatuses.Succeeded));
  });
};
export const removeTodolistTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC(LoadingStatuses.Loading));
  dispatch(changeTodolistEntityStatusAC(todolistId, LoadingStatuses.Loading));
  todolistsAPI.deleteTodolist(todolistId).then(() => {
    dispatch(removeTodolistAC(todolistId));
    dispatch(setAppStatusAC(LoadingStatuses.Succeeded));
  });
};
export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC(LoadingStatuses.Loading));
  todolistsAPI.createTodolist(title).then(res => {
    dispatch(addTodolistAC(res.data.data.item));
    dispatch(setAppStatusAC(LoadingStatuses.Succeeded));
  });
};
export const changeTodolistTitleTC =
  (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolist(id, title).then(() => {
      dispatch(changeTodolistTitleAC(id, title));
    });
  };
