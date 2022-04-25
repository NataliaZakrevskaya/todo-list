import { SetAppErrorActionType, SetAppStatusActionType } from '../../../app/app-reducer';
import { setIsLoggedInAC, initialState } from '../auth-reducer';

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
