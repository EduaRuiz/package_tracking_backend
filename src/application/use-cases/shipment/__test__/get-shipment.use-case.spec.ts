import { IShipmentDomainService } from 'src/domain/services';
import { GetShipmentUseCase } from '..';
import { of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../interface';

let getShipmentUseCase: IUseCase;
let shipmentDomainService: IShipmentDomainService;

describe('GetShipmentUseCase', () => {
  // Arrange
  beforeEach(() => {
    shipmentDomainService = {
      getShipmentById: jest
        .fn()
        .mockReturnValue(of({ id: '1234', user: { _id: '5678' } } as any)),
    } as unknown as IShipmentDomainService;

    // Act
    getShipmentUseCase = new GetShipmentUseCase(shipmentDomainService);
  });

  it('should be defined', () => {
    // Assert
    expect(getShipmentUseCase).toBeDefined();
  });

  it('should get shipment successfully', (done) => {
    // Arrange
    const shipmentId = '1234';
    const userId = '5678';

    // Act
    const result$ = getShipmentUseCase.execute(shipmentId, userId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toEqual({
          id: '1234',
          user: { _id: '5678' },
        });
        done();
      },
    });
  });

  it('should throw NotFoundException when userId does not match shipment user', (done) => {
    // Arrange
    const shipmentId = '1234';
    const userId = '9999';
    jest
      .spyOn(shipmentDomainService, 'getShipmentById')
      .mockReturnValue(of({ id: '1234', user: { _id: '5678' } } as any));

    // Act
    const result$ = getShipmentUseCase.execute(shipmentId, userId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Shipment not found');
        expect(shipmentDomainService.getShipmentById).toHaveBeenCalledWith(
          shipmentId,
        );
        done();
      },
    });
  });
});
