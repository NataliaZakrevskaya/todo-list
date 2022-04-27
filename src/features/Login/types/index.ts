import { SetAppErrorActionType, SetAppStatusActionType } from '../../../app/App/types';
import { setIsLoggedInAC, initialState } from '../Auth/authReducer/authReducer';

export type AuthReducerActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusActionType
  | SetAppErrorActionType;

export type InitialStateType = typeof initialState;

export type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};
