import {
  IShipmentDomainService,
  IUserDomainService,
} from 'src/domain/services';
import { of, throwError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../interface';
import { DeleteUserUseCase } from '..';
import { shipment } from './mocks';

describe('DeleteUserUseCase', () => {
  let user$: IUserDomainService;
  let shipment$: IShipmentDomainService;
  let deleteUserUseCase: IUseCase;

  beforeEach(() => {
    user$ = {
      deleteUser: jest.fn(),
    } as unknown as IUserDomainService;
    shipment$ = {
      getAllShipments: jest.fn(),
    } as unknown as IShipmentDomainService;
    deleteUserUseCase = new DeleteUserUseCase(user$, shipment$);
  });

  it('should be defined', () => {
    // Assert
    expect(deleteUserUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should delete the user if it has no shipments or all the shipments have FINALIZED status', (done) => {
      // Arrange
      const userId = '1';
      const currentUserId = '1';
      const shipments = [shipment];

      jest
        .spyOn(shipment$, 'getAllShipments')
        .mockReturnValueOnce(of(shipments));
      jest.spyOn(user$, 'deleteUser').mockReturnValueOnce(of(undefined));

      // Act
      const result$ = deleteUserUseCase.execute(userId, currentUserId);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBeUndefined();
          expect(shipment$.getAllShipments).toHaveBeenCalled();
          expect(user$.deleteUser).toHaveBeenCalledWith(userId);
          done();
        },
      });
    });

    it('should throw a NotFoundException if the user does not exist', (done) => {
      // Arrange
      const userId = shipment.user._id;
      const currentUserId = shipment.user._id;
      const shipments = [];
      jest
        .spyOn(shipment$, 'getAllShipments')
        .mockReturnValueOnce(of(shipments));
      jest
        .spyOn(user$, 'deleteUser')
        .mockReturnValueOnce(throwError(() => new NotFoundException()));

      // Act
      const result$ = deleteUserUseCase.execute(userId, currentUserId);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(shipment$.getAllShipments).toHaveBeenCalled();
          expect(user$.deleteUser).toHaveBeenCalledWith(userId);
          done();
        },
      });
    });

    it('should throw an error if the user has at least one shipment with a non-FINALIZED status', (done) => {
      // Arrange
      const userId = shipment.user._id;
      const currentUserId = shipment.user._id;
      const shipments = [shipment];
      jest
        .spyOn(shipment$, 'getAllShipments')
        .mockReturnValueOnce(of(shipments));

      // Act
      const result$ = deleteUserUseCase.execute(userId, currentUserId);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          expect(shipment$.getAllShipments).toHaveBeenCalled();
          expect(user$.deleteUser).not.toHaveBeenCalled();
          done();
        },
      });
    });

    it('should throw an error if userId !== currentUserId', (done) => {
      // Arrange
      const userId = '1';
      const currentUserId = '2';

      // Act
      const result$ = deleteUserUseCase.execute(userId, currentUserId);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          expect(shipment$.getAllShipments).not.toHaveBeenCalled();
          expect(user$.deleteUser).not.toHaveBeenCalled();
          done();
        },
      });
    });
  });
});
