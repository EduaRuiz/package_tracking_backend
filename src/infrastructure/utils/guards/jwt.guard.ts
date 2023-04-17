import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, map, of, switchMap, catchError } from 'rxjs';

/**
 * Jwt Guard class to validate the token
 *
 * @export
 * @class JwtGuard
 * @typedef {JwtGuard}
 * @implements {CanActivate}
 */
@Injectable()
export class JwtGuard implements CanActivate {
  /**
   * Creates an instance of JwtGuard.
   *
   * @constructor
   * @param {JwtService} jwtService The jwt service to validate the token
   */
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Validates the token
   *
   * @param {ExecutionContext} context The context
   * @returns {Observable<boolean>} The validation result
   */
  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    return of(token).pipe(
      map((token) => (token ? this.jwtService.verify(token) : null)),
      catchError((err: Error) => {
        throw new UnauthorizedException(err.message);
      }),
      switchMap((decoded) => (decoded ? of(true) : of(false))),
    );
  }
}
