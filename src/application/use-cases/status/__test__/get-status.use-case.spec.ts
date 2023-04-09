import { IStatusDomainService } from 'src/domain/services';
import { of, throwError } from 'rxjs';
import { IUseCase } from '../../interface';
import { GetStatusUseCase } from '..';
import { status } from './';

describe('GetStatusUseCase', () => {
  let status$: IStatusDomainService;
  let getStatusUseCase: IUseCase;

  beforeEach(() => {
    // Arrange
    status$ = {
      getStatus: jest.fn(),
    } as unknown as IStatusDomainService;
    getStatusUseCase = new GetStatusUseCase(status$);
  });

  it('should be defined', () => {
    // Assert
    expect(getStatusUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a status entity with the given id', (done) => {
      // Arrange
      const statusId = '1';
      const statusEntity = status;
      jest.spyOn(status$, 'getStatus').mockReturnValueOnce(of(statusEntity));

      // Act
      const result$ = getStatusUseCase.execute(statusId);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(statusEntity);
          expect(status$.getStatus).toHaveBeenCalledWith(statusId);
          done();
        },
      });
    });

    it('should throw an error when the status is not found', (done) => {
      // Arrange
      const statusId = '1';
      jest
        .spyOn(status$, 'getStatus')
        .mockReturnValueOnce(throwError(() => new Error()));

      // Act
      const result$ = getStatusUseCase.execute(statusId);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          expect(status$.getStatus).toHaveBeenCalledWith(statusId);
          done();
        },
      });
    });
  });
});
