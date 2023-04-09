import { IStatusDomainService } from 'src/domain/services';
import { of, throwError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { status } from './';
import { IUseCase } from '../../interface';
import { UpdateStatusUseCase } from '..';
import { updateStatusDto } from './mocks';

describe('UpdateStatusUseCase', () => {
  let status$: IStatusDomainService;
  let updateStatusUseCase: IUseCase;

  beforeEach(() => {
    status$ = {
      getStatus: jest.fn(),
      updateStatus: jest.fn(),
    } as unknown as IStatusDomainService;
    updateStatusUseCase = new UpdateStatusUseCase(status$);
  });

  it('should be defined', () => {
    // Assert
    expect(updateStatusUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return the updated status entity', (done) => {
      const statusEntity = status;
      const statusId = statusEntity._id;
      const dto = updateStatusDto;
      const updatedStatus = { ...statusEntity, ...dto, _id: statusId };
      jest.spyOn(status$, 'getStatus').mockReturnValueOnce(of(statusEntity));
      jest
        .spyOn(status$, 'updateStatus')
        .mockReturnValueOnce(of(updatedStatus));

      // Act
      const result$ = updateStatusUseCase.execute(dto);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual({
            ...statusEntity,
            ...dto,
          });
          expect(status$.getStatus).toHaveBeenCalledWith(statusId);
          expect(status$.updateStatus).toHaveBeenCalledWith(statusId, {
            ...statusEntity,
            ...dto,
          });
          done();
        },
      });
    });

    it('should throw NotFoundException when status is not found', (done) => {
      // Arrange
      const dto = updateStatusDto;
      const statusId = updateStatusDto._id;
      jest
        .spyOn(status$, 'getStatus')
        .mockReturnValueOnce(throwError(() => new NotFoundException()));

      // Act
      const result$ = updateStatusUseCase.execute(dto);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(status$.getStatus).toHaveBeenCalledWith(statusId);
          expect(status$.updateStatus).not.toHaveBeenCalled();
          done();
        },
      });
    });
  });
});
