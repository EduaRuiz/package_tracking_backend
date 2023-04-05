import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { IUserDomainEntity } from 'src/domain/entities';
import { IUserResponse } from 'src/domain/interfaces';
import { IAuthDomainService } from 'src/domain/services';

@Injectable()
export class AuthService implements IAuthDomainService {
  constructor(private readonly jwtService: JwtService) {}

  generateAuthResponse(user: IUserDomainEntity): Observable<IUserResponse> {
    return of({
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token: this.jwtService.sign({ id: user._id }),
    });
  }
}
