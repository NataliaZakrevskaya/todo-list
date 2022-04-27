import { SET_IS_LOGGED_IN } from '../../constants';
import { AuthReducerActionsType, InitialStateType } from '../../types';

export const initialState = {
  isLoggedIn: false,
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthReducerActionsType,
): InitialStateType => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};

export const setIsLoggedInAC = (isLoggedIn: boolean) =>
  ({ type: SET_IS_LOGGED_IN, isLoggedIn } as const);
