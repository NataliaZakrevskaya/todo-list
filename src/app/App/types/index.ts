import {
  setAppErrorAC,
  setAppStatusAC,
  setIsInitializedAC,
} from '../appReducer/appReducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppInitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type setIsInitializedActionType = ReturnType<typeof setIsInitializedAC>;

export type AppActionsType =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | setIsInitializedActionType;
