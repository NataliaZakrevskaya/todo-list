import { AxiosResponse } from 'axios';

import { instance } from '../apiConfig';
import { LoginParamsType, MeResponseType, ResponseType } from '../types';

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<
      LoginParamsType,
      AxiosResponse<ResponseType<{ userId: number }>>
    >(`auth/login`, data);
  },
  me() {
    return instance.get<ResponseType<MeResponseType>>(`auth/me`);
  },
  logout() {
    return instance.delete<ResponseType>(`auth/login`);
  },
};
