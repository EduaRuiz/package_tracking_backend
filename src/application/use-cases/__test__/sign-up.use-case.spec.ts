import { IAuthDomainService, IUserDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { signUpDto, user, userResponse } from './mocks';
import { of } from 'rxjs';
import { SingUpUseCase } from '..';
import { ConflictException } from '@nestjs/common';

let signUpUseCase: IUseCase;
let userDomainService: IUserDomainService;
let authDomainService: IAuthDomainService;

describe('SignUpUseCase', () => {
  beforeEach(() => {
    // Arrange
    userDomainService = {
      getAllUsers: jest.fn().mockReturnValue(of([user])),
      signUp: jest.fn().mockReturnValue(of(user)),
    } as unknown as IUserDomainService;
    authDomainService = {
      generateAuthResponse: jest.fn().mockReturnValue(of(userResponse)),
    };

    // Act
    signUpUseCase = new SingUpUseCase(userDomainService, authDomainService);
  });

  it('should be defined', () => {
    // Assert
    expect(signUpUseCase).toBeDefined();
  });

  it('should sign up successfully', (done) => {
    // Arrange
    const dto = signUpDto;
    dto.document = '123456789';
    dto.email = 'mail@mail.com';
    dto.firebaseId = '123456789';
    const expectedData = userResponse.data;
    const expectedToken = userResponse.token;

    // Act
    const result$ = signUpUseCase.execute(dto);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result.token).toBe(expectedToken);
        expect(result.data).toBe(expectedData);
        done();
      },
    });
  });

  it('should throw an error if email already exists', (done) => {
    // Arrange
    const dto = signUpDto;
    dto.document = '123456789';
    dto.firebaseId = '123456789';
    dto.email = user.email;
    const message = 'Email already exist';

    // Act
    const result$ = signUpUseCase.execute(dto);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe(message);
        done();
      },
    });
  });

  it('should throw an error if firebaseId already exists', (done) => {
    // Arrange
    const dto = signUpDto;
    dto.document = '123456789';
    dto.email = 'mail@mail.com';
    dto.firebaseId = user.firebaseId;
    const message = 'FirebaseId already exist';

    // Act
    const result$ = signUpUseCase.execute(dto);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe(message);
        done();
      },
    });
  });

  it('should throw an error if document already exists', (done) => {
    // Arrange
    const dto = signUpDto;
    dto.email = 'test@mail.co';
    dto.firebaseId = '123456789';
    dto.document = user.document;
    const message = 'Document already exist';

    // Act
    const result$ = signUpUseCase.execute(dto);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe(message);
        done();
      },
    });
  });
});
