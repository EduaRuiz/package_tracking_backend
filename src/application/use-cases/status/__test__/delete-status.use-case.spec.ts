import { DeleteStatusUseCase } from '..';
import {
  IShipmentDomainService,
  IStatusDomainService,
} from 'src/domain/services';
import { StatusDomainEntity, ShipmentDomainEntity } from 'src/domain/entities';
import { of, throwError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../interface';

let deleteStatusUseCase: IUseCase;
let statusDomainService: IStatusDomainService;
let shipmentDomainService: IShipmentDomainService;

describe('DeleteStatusUseCase', () => {
  beforeEach(() => {
    statusDomainService = {
      deleteStatus: jest.fn(),
    } as unknown as IStatusDomainService;

    shipmentDomainService = {
      getAllShipments: jest.fn(),
    } as unknown as IShipmentDomainService;

    deleteStatusUseCase = new DeleteStatusUseCase(
      statusDomainService,
      shipmentDomainService,
    );
  });

  it('should be defined', () => {
    // Assert
    expect(deleteStatusUseCase).toBeDefined();
  });

  it('should delete status when it is not used in any shipment', (done) => {
    // Arrange
    const statusId = '1234';
    jest
      .spyOn(shipmentDomainService, 'getAllShipments')
      .mockReturnValue(of([]));
    jest
      .spyOn(statusDomainService, 'deleteStatus')
      .mockReturnValue(of({ _id: statusId } as StatusDomainEntity));

    // Act
    const result$ = deleteStatusUseCase.execute(statusId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result._id).toEqual(statusId);
        expect(shipmentDomainService.getAllShipments).toHaveBeenCalled();
        expect(statusDomainService.deleteStatus).toHaveBeenCalledWith(statusId);
        done();
      },
    });
  });

  it('should throw error when status is used in a shipment', (done) => {
    // Arrange
    const statusId = '1234';
    const shipment = {
      status: { _id: statusId } as StatusDomainEntity,
    } as ShipmentDomainEntity;
    jest
      .spyOn(shipmentDomainService, 'getAllShipments')
      .mockReturnValue(of([shipment]));

    // Act
    const result$ = deleteStatusUseCase.execute(statusId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toEqual(
          new Error('Cannot delete status because it is in use'),
        );
        expect(shipmentDomainService.getAllShipments).toHaveBeenCalled();
        expect(statusDomainService.deleteStatus).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it('should throw NotFoundException when status is not found', (done) => {
    // Arrange
    const statusId = '1234';
    jest
      .spyOn(shipmentDomainService, 'getAllShipments')
      .mockReturnValue(of([]));
    jest
      .spyOn(statusDomainService, 'deleteStatus')
      .mockReturnValue(throwError(() => new NotFoundException()));

    // Act
    const result$ = deleteStatusUseCase.execute(statusId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(shipmentDomainService.getAllShipments).toHaveBeenCalled();
        expect(statusDomainService.deleteStatus).toHaveBeenCalledWith(statusId);
        done();
      },
    });
  });
});
