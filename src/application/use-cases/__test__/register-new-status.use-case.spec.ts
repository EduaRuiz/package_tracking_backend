import { IStatusDomainService } from 'src/domain/services';
import { IUseCase, RegisterNewStatusUseCase } from '..';
import { of, throwError } from 'rxjs';
import { newStatusDto, status } from './mocks';

let registerNewStatusUseCase: IUseCase;
let statusDomainService: IStatusDomainService;

describe('RegisterNewStatusUseCase', () => {
  beforeEach(() => {
    statusDomainService = {
      createStatus: jest.fn(),
    } as unknown as IStatusDomainService;

    registerNewStatusUseCase = new RegisterNewStatusUseCase(
      statusDomainService,
    );
  });

  it('should be defined', () => {
    // Assert
    expect(registerNewStatusUseCase).toBeDefined();
  });

  it('should create a new status successfully', (done) => {
    // Arrange
    const dto = newStatusDto;
    const expectedStatus = status;

    jest
      .spyOn(statusDomainService, 'createStatus')
      .mockReturnValue(of(expectedStatus));

    // Act
    const result$ = registerNewStatusUseCase.execute(dto);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toEqual(expectedStatus);
        expect(statusDomainService.createStatus).toHaveBeenCalledWith(dto);
        done();
      },
    });
  });

  it('should throw a NotFoundException if status creation failed', (done) => {
    // Arrange
    const dto = newStatusDto;
    const errorMessage = 'Status creation failed';
    jest
      .spyOn(statusDomainService, 'createStatus')
      .mockReturnValue(throwError(new Error(errorMessage)));

    // Act
    const result$ = registerNewStatusUseCase.execute(dto);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(errorMessage);
        expect(statusDomainService.createStatus).toHaveBeenCalledWith(dto);
        done();
      },
    });
  });
});
