import { UpdateShipmentUseCase } from '..';
import {
  IShipmentDomainService,
  IStatusDomainService,
} from 'src/domain/services';
import { StatusDomainEntity } from 'src/domain/entities';
import { of, throwError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../interface';
import { shipment, status, updateShipmentDto } from './mocks';

let updateShipmentUseCase: IUseCase;
let shipmentDomainService: IShipmentDomainService;
let statusDomainService: IStatusDomainService;

describe('UpdateShipmentUseCase', () => {
  beforeEach(() => {
    shipmentDomainService = {
      getShipmentById: jest.fn(),
      updateShipment: jest.fn(),
    } as unknown as IShipmentDomainService;
    statusDomainService = {
      getStatus: jest.fn(),
    } as unknown as IStatusDomainService;

    updateShipmentUseCase = new UpdateShipmentUseCase(
      shipmentDomainService,
      statusDomainService,
    );
  });

  it('should be defined', () => {
    // Assert
    expect(updateShipmentUseCase).toBeDefined();
  });

  describe('when statusId is not provided', () => {
    it('should update shipment without status', (done) => {
      // Arrange
      const shipmentId = '1234';
      const dto = updateShipmentDto;
      dto.statusId = undefined;
      const shipmentToUpdate = shipment;
      shipmentToUpdate._id = shipmentId;
      shipmentToUpdate.originAddress = 'old origin address';
      shipmentToUpdate.status = status;
      jest
        .spyOn(shipmentDomainService, 'getShipmentById')
        .mockReturnValue(of(shipmentToUpdate));
      jest
        .spyOn(shipmentDomainService, 'updateShipment')
        .mockReturnValue(of(shipmentToUpdate));
      jest.spyOn(statusDomainService, 'getStatus').mockReturnValue(of(status));

      // Act
      const result$ = updateShipmentUseCase.execute(shipmentId, dto);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(shipmentToUpdate);
          expect(shipmentDomainService.getShipmentById).toHaveBeenCalledWith(
            shipmentId,
          );
          expect(shipmentDomainService.updateShipment).toHaveBeenCalledWith(
            shipmentId,
            {
              ...shipmentToUpdate,
              ...dto,
              updatedAt: expect.any(Date),
              _id: shipmentToUpdate._id,
            },
          );
          done();
        },
      });
    });
  });

  describe('when statusId is provided', () => {
    it('should throw NotFoundException when status is not found', (done) => {
      // Arrange
      const shipmentId = '1234';
      const statusId = '5678';
      const dto = {
        statusId,
      };
      jest
        .spyOn(statusDomainService, 'getStatus')
        .mockReturnValue(throwError(() => new NotFoundException()));

      // Act
      const result$ = updateShipmentUseCase.execute(shipmentId, dto);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(statusDomainService.getStatus).toHaveBeenCalledWith(statusId);
          expect(shipmentDomainService.getShipmentById).not.toHaveBeenCalled();
          expect(shipmentDomainService.updateShipment).not.toHaveBeenCalled();
          done();
        },
      });
    });

    it('should update shipment with provided status', (done) => {
      // Arrange
      const shipmentId = '1234';
      const statusId = '5678';
      const dto = {
        statusId,
      };
      const shipmentToUpdate = shipment;
      shipmentToUpdate._id = shipmentId;
      shipmentToUpdate.destinationAddress = 'old destination address';
      shipmentToUpdate.status = status;
      const newStatus = {
        _id: statusId,
        name: 'FINALIZED',
      } as unknown as StatusDomainEntity;
      jest
        .spyOn(statusDomainService, 'getStatus')
        .mockReturnValue(of(newStatus));
      jest
        .spyOn(shipmentDomainService, 'getShipmentById')
        .mockReturnValue(of(shipmentToUpdate));
      jest
        .spyOn(shipmentDomainService, 'updateShipment')
        .mockReturnValue(of(shipmentToUpdate));

      // Act
      const result$ = updateShipmentUseCase.execute(shipmentId, dto);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(shipmentToUpdate);
          expect(statusDomainService.getStatus).toHaveBeenCalledWith(statusId);
          expect(shipmentDomainService.getShipmentById).toHaveBeenCalledWith(
            shipmentId,
          );
          expect(shipmentDomainService.updateShipment).toHaveBeenCalledWith(
            shipmentId,
            {
              ...shipmentToUpdate,
              ...dto,
              status: newStatus,
              updatedAt: expect.any(Date),
              _id: shipmentToUpdate._id,
            },
          );
          done();
        },
      });
    });
  });
});
