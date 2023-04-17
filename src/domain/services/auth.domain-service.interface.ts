import { Observable } from 'rxjs';
import { IUserDomainEntity } from '../entities';
import { IUserResponse } from '../interfaces';

/**
 * Auth Domain Service interface definition
 *
 * @export
 * @interface IAuthDomainService
 * @typedef {IAuthDomainService}
 */
export interface IAuthDomainService {
  /**
   * Generates an auth response with the user data and a JWT token
   *
   * @param {IUserDomainEntity} user The user to generate the response
   * @returns {Observable<IUserResponse>} The auth response
   */
  generateAuthResponse(user: IUserDomainEntity): Observable<IUserResponse>;
}
