import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, of } from 'rxjs';
import { IUserDomainEntity } from 'src/domain/entities';
import { IUserResponse } from 'src/domain/interfaces';
import { IAuthDomainService } from 'src/domain/services';

/**
 * Auth Service class
 *
 * @export
 * @class AuthService
 * @typedef {AuthService}
 * @implements {IAuthDomainService}
 */
@Injectable()
export class AuthService implements IAuthDomainService {
  /**
   * Creates an instance of AuthService.
   *
   * @constructor
   * @param {JwtService} jwtService The JWT service to sign tokens
   */
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Generates an auth response with the user data and a JWT token
   *
   * @param {IUserDomainEntity} user The user to generate the response
   * @returns {Observable<IUserResponse>} The auth response
   */
  generateAuthResponse(user: IUserDomainEntity): Observable<IUserResponse> {
    return of({
      data: {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
      token: this.jwtService.sign({ id: user._id.toString() }),
    });
  }
}
