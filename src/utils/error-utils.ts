import { Dispatch } from 'redux';

import { FIRST_ELEMENT_IN_ARRAY } from '../constants';
import { ErrorValues } from '../enums';

import { ResponseType } from 'api/types';
import {
  setAppErrorAC,
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from 'app/app-reducer';
import { LoadingStatuses } from 'features/enums';

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>,
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[FIRST_ELEMENT_IN_ARRAY]));
  } else {
    dispatch(setAppErrorAC(ErrorValues.Some_Error));
  }
  dispatch(setAppStatusAC(LoadingStatuses.Failed));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>,
): void => {
  dispatch(setAppErrorAC(error.message ? error.message : ErrorValues.Some_Error));
  dispatch(setAppStatusAC(LoadingStatuses.Failed));
};
