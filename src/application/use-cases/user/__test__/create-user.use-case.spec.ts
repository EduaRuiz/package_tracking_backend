import { IUserDomainService } from 'src/domain/services';
import { of, throwError } from 'rxjs';
import { signUpDto, user } from './mocks';
import { IUseCase } from '../../interface';
import { CreateUserUseCase } from '..';

let createUserUseCase: IUseCase;
let userDomainService: IUserDomainService;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    userDomainService = {
      signUp: jest.fn().mockReturnValue(of({ id: '1234', name: 'John' })),
    } as unknown as IUserDomainService;

    createUserUseCase = new CreateUserUseCase(userDomainService);
  });

  it('should be defined', () => {
    // Assert
    expect(createUserUseCase).toBeDefined();
  });

  it('should create user successfully', (done) => {
    const dto = signUpDto;
    const createdUser = user;
    jest.spyOn(userDomainService, 'signUp').mockReturnValue(of(createdUser));

    const result$ = createUserUseCase.execute(dto);

    result$.subscribe({
      next: (result) => {
        expect(result).toEqual(createdUser);
        expect(userDomainService.signUp).toHaveBeenCalledWith(dto);
        done();
      },
    });
  });

  it('should throw error when user already exists', (done) => {
    // Arrange
    const dto = signUpDto;
    const message = 'User already exists';
    jest
      .spyOn(userDomainService, 'signUp')
      .mockReturnValue(throwError(new Error(message)));

    // Act
    const result$ = createUserUseCase.execute(dto);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toEqual(new Error(message));
        expect(userDomainService.signUp).toHaveBeenCalledWith(dto);
        done();
      },
    });
  });
});
