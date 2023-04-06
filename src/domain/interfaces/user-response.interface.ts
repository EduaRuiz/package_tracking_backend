import { IUserAuthData } from '.';

export interface IUserResponse {
  data: IUserAuthData;
  token: string;
}
