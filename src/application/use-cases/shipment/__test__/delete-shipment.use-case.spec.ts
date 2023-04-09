import { DeleteShipmentUseCase } from '..';
import { IShipmentDomainService } from 'src/domain/services';
import { of, throwError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../interface';
import { shipment } from './mocks';

let deleteShipmentUseCase: IUseCase;
let shipmentDomainService: IShipmentDomainService;

describe('DeleteShipmentUseCase', () => {
  beforeEach(() => {
    shipmentDomainService = {
      getShipmentById: jest.fn(),
      deleteShipment: jest.fn(),
    } as unknown as IShipmentDomainService;

    deleteShipmentUseCase = new DeleteShipmentUseCase(shipmentDomainService);
  });

  it('should be defined', () => {
    // Assert
    expect(deleteShipmentUseCase).toBeDefined();
  });

  it('should delete shipment when status is FINALIZED and userId matches shipment user', (done) => {
    // Arrange
    const shipmentId = '1234';
    const userId = '5678';
    const shipmentDeleted = shipment;
    shipmentDeleted._id = shipmentId;
    shipmentDeleted.status.name = 'FINALIZED';
    shipmentDeleted.user._id = userId;
    jest
      .spyOn(shipmentDomainService, 'getShipmentById')
      .mockReturnValue(of(shipmentDeleted));
    jest
      .spyOn(shipmentDomainService, 'deleteShipment')
      .mockReturnValue(of(shipmentDeleted));

    // Act
    const result$ = deleteShipmentUseCase.execute(shipmentId, userId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toEqual(shipmentDeleted);
        expect(shipmentDomainService.getShipmentById).toHaveBeenCalledWith(
          shipmentId,
        );
        expect(shipmentDomainService.deleteShipment).toHaveBeenCalledWith(
          shipmentId,
        );
        done();
      },
    });
  });

  it('should throw error when shipment status is not FINALIZED', (done) => {
    // Arrange
    const shipmentId = '1234';
    const userId = '5678';
    const message =
      'Cannot delete shipment because its status is not FINALIZED';
    const shipmentDeleted = shipment;
    shipmentDeleted.status.name = 'ACTIVE';
    jest
      .spyOn(shipmentDomainService, 'getShipmentById')
      .mockReturnValue(of(shipmentDeleted));

    // Act
    const result$ = deleteShipmentUseCase.execute(shipmentId, userId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toEqual(new Error(message));
        expect(shipmentDomainService.getShipmentById).toHaveBeenCalledWith(
          shipmentId,
        );
        expect(shipmentDomainService.deleteShipment).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it('should throw NotFoundException when shipment is not found', (done) => {
    // Arrange
    const shipmentId = '1234';
    const userId = '5678';
    jest
      .spyOn(shipmentDomainService, 'getShipmentById')
      .mockReturnValue(throwError(() => new NotFoundException()));

    // Act
    const result$ = deleteShipmentUseCase.execute(shipmentId, userId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(shipmentDomainService.getShipmentById).toHaveBeenCalledWith(
          shipmentId,
        );
        expect(shipmentDomainService.deleteShipment).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it('should throw error when userId does not match shipment user', (done) => {
    // Arrange
    const shipmentId = '1234';
    const userId = '9999';
    const shipmentDeleted = shipment;
    const message =
      'Cannot delete shipment because its status is not FINALIZED';
    shipmentDeleted.user._id = '5678';
    jest
      .spyOn(shipmentDomainService, 'getShipmentById')
      .mockReturnValue(of(shipmentDeleted));

    // Act
    const result$ = deleteShipmentUseCase.execute(shipmentId, userId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toEqual(new Error(message));
        expect(shipmentDomainService.getShipmentById).toHaveBeenCalledWith(
          shipmentId,
        );
        expect(shipmentDomainService.deleteShipment).not.toHaveBeenCalled();
        done();
      },
    });
  });
});
