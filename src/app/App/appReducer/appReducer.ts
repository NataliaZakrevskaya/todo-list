import { AppActionsType, AppInitialStateType, RequestStatusType } from '../types';

import { SET_ERROR, SET_INITIALIZED, SET_STATUS } from './constants';

const initialState: AppInitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
};

export const appReducer = (
  state: AppInitialStateType = initialState,
  action: AppActionsType,
): AppInitialStateType => {
  switch (action.type) {
    case SET_STATUS:
      return { ...state, status: action.status };
    case SET_ERROR:
      return { ...state, error: action.error };
    case SET_INITIALIZED:
      return { ...state, isInitialized: action.isInitialized };
    default:
      return { ...state };
  }
};

export const setAppErrorAC = (error: string | null) =>
  ({ type: SET_ERROR, error } as const);
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: SET_STATUS, status } as const);

export const setIsInitializedAC = (isInitialized: boolean) =>
  ({ type: SET_INITIALIZED, isInitialized } as const);
