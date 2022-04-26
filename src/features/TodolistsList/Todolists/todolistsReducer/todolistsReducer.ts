import { FilterValues, LoadingStatuses } from '../../../enums';
import {
  ADD_TODOLIST,
  CHANGE_TODOLIST_FILTER,
  CHANGE_TODOLIST_STATUS,
  CHANGE_TODOLIST_TITLE,
  REMOVE_TODOLIST,
  SET_TODOLISTS,
} from '../constants';
import {
  FilterValuesType,
  TodolistDomainType,
  TodolistsReducerActionsType,
  TodolistType,
} from '../types/types';

import { RequestStatusType } from 'app/app-reducer';

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: TodolistsReducerActionsType,
): Array<TodolistDomainType> => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter(todolist => todolist.id !== action.todolistId);
    case ADD_TODOLIST:
      return [
        {
          ...action.todolist,
          filter: FilterValues.All,
          entityStatus: LoadingStatuses.Idle,
        },
        ...state,
      ];

    case CHANGE_TODOLIST_TITLE:
      return state.map(todolist =>
        todolist.id === action.id ? { ...todolist, title: action.title } : todolist,
      );
    case CHANGE_TODOLIST_FILTER:
      return state.map(todolist =>
        todolist.id === action.todolistId
          ? { ...todolist, filter: action.filter }
          : todolist,
      );
    case CHANGE_TODOLIST_STATUS:
      return state.map(todolist =>
        todolist.id === action.todolistId
          ? { ...todolist, entityStatus: action.status }
          : todolist,
      );
    case SET_TODOLISTS:
      return action.todolists.map((todolist: TodolistType) => ({
        ...todolist,
        filter: FilterValues.All,
        entityStatus: LoadingStatuses.Idle,
      }));
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string) =>
  ({ type: REMOVE_TODOLIST, todolistId } as const);
export const addTodolistAC = (todolist: TodolistType) =>
  ({ type: ADD_TODOLIST, todolist } as const);
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
  ({
    type: CHANGE_TODOLIST_TITLE,
    id: todolistId,
    title,
  } as const);
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) =>
  ({
    type: CHANGE_TODOLIST_FILTER,
    todolistId,
    filter,
  } as const);
export const changeTodolistEntityStatusAC = (
  todolistId: string,
  status: RequestStatusType,
) =>
  ({
    type: CHANGE_TODOLIST_STATUS,
    todolistId,
    status,
  } as const);
export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({ type: SET_TODOLISTS, todolists } as const);
