import { Dispatch } from 'redux';

import { authAPI } from '../../api/authAPI/authAPI';
import { LoginParamsType } from '../../api/types';

import { SET_IS_LOGGED_IN } from './constants';
import { LoadingStatuses } from '../enums/enums';
import { AuthReducerActionsType, InitialStateType } from './types';

import { setAppStatusAC, setIsInitializedAC } from 'app';
import { ResultCodes } from 'enums';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

export const initialState = {
  isLoggedIn: false,
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthReducerActionsType,
): InitialStateType => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.isLogged };
    default:
      return state;
  }
};
// actions
export const setIsLoggedInAC = (isLogged: boolean) =>
  ({ type: SET_IS_LOGGED_IN, isLogged } as const);

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then(res => {
      if (res.data.resultCode === ResultCodes.Success) dispatch(setIsLoggedInAC(true));
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true));
    });
};

export const loginTC =
  (data: LoginParamsType) => (dispatch: Dispatch<AuthReducerActionsType>) => {
    dispatch(setAppStatusAC(LoadingStatuses.Loading));
    authAPI
      .login(data)
      .then(res => {
        if (res.data.resultCode === ResultCodes.Success) {
          dispatch(setIsLoggedInAC(true));
          dispatch(setAppStatusAC(LoadingStatuses.Succeeded));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
    dispatch(setAppStatusAC(LoadingStatuses.Succeeded));
  };

export const logoutTC = () => (dispatch: Dispatch<AuthReducerActionsType>) => {
  dispatch(setAppStatusAC(LoadingStatuses.Loading));
  authAPI
    .logout()
    .then(res => {
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(setIsLoggedInAC(false));
        dispatch(setAppStatusAC(LoadingStatuses.Succeeded));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
