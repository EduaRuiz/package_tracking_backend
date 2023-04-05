import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, map, of, switchMap, catchError } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

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
