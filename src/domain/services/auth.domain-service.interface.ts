import { Observable } from 'rxjs';
import { IUserDomainEntity } from '../entities';
import { IUserResponse } from '../interfaces';

export interface IAuthDomainService {
  generateAuthResponse(user: IUserDomainEntity): Observable<IUserResponse>;
}
