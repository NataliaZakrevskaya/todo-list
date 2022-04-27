import { AxiosResponse } from 'axios';

import { AUTH_LOGIN, AUTH_ME } from './constants';

import { instance } from 'api/apiConfig';
import { LoginParamsType, MeResponseType, ResponseType } from 'api/types';

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<
      LoginParamsType,
      AxiosResponse<ResponseType<{ userId: number }>>
    >(AUTH_LOGIN, data);
  },
  me() {
    return instance.get<ResponseType<MeResponseType>>(AUTH_ME);
  },
  logout() {
    return instance.delete<ResponseType>(AUTH_LOGIN);
  },
};
