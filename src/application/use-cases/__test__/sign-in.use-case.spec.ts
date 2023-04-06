import { IUseCase } from '../interface';
import { IAuthDomainService, IUserDomainService } from 'src/domain/services';
import { signInDto, user, userResponse } from './mocks';
import { of, throwError } from 'rxjs';
import { SignInUseCase } from '..';
import { NotFoundException } from '@nestjs/common';

let signInUseCase: IUseCase;
let userDomainService: IUserDomainService;
let authDomainService: IAuthDomainService;

describe('SignInUseCase', () => {
  beforeEach(() => {
    userDomainService = {
      signIn: jest.fn().mockReturnValue(of(user)),
    } as unknown as IUserDomainService;
    authDomainService = {
      generateAuthResponse: jest.fn().mockReturnValue(of(userResponse)),
    };
    signInUseCase = new SignInUseCase(userDomainService, authDomainService);
  });

  it('should be defined', () => {
    // Assert
    expect(signInUseCase).toBeDefined();
  });

  it('should sign in successfully', (done) => {
    // Arrange
    const dto = signInDto;

    // Act
    const result$ = signInUseCase.execute(dto);

    // Assert
    result$.subscribe((result) => {
      expect(result.token).toBe(userResponse.token);
      expect(result.data.email).toBe(userResponse.data.email);
      done();
    });
  });

  it('should throw NotFoundException when user not found', (done) => {
    // Arrange
    const dto = signInDto;
    const message = 'User not found';

    jest
      .spyOn(userDomainService, 'signIn')
      .mockReturnValue(throwError(new NotFoundException(message)));

    // Act
    const result$ = signInUseCase.execute(dto);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(message);
        done();
      },
    });
  });
});
