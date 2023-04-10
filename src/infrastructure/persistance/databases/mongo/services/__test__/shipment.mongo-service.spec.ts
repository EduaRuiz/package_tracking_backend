import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentMongoService } from '..';
import {
  ShipmentMongoRepository,
  StatusMongoRepository,
} from '../../repositories';
import { ShipmentMongoModel, StatusMongoModel } from '../../models';
import { of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

describe('ShipmentMongoService', () => {
  let shipmentService: ShipmentMongoService;
  let shipmentRepository: ShipmentMongoRepository;
  let statusRepository: StatusMongoRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ShipmentMongoService,
        {
          provide: ShipmentMongoRepository,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOneById: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: StatusMongoRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    shipmentService = moduleRef.get<ShipmentMongoService>(ShipmentMongoService);
    shipmentRepository = moduleRef.get<ShipmentMongoRepository>(
      ShipmentMongoRepository,
    );
    statusRepository = moduleRef.get<StatusMongoRepository>(
      StatusMongoRepository,
    );
  });

  describe('createShipment', () => {
    // Arrange
    let entity: ShipmentMongoModel = {
      _id: '1',
      originAddress: 'Test Origin Address',
      destinationAddress: 'Test Destination Address',
      status: { _id: '1', name: 'CREATED', description: 'Created' },
      user: {
        _id: '1',
        name: 'Test User',
        email: 'email',
        document: 'document',
        firebaseId: 'firebaseId',
        phone: 'phone',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    let status: StatusMongoModel[] = [
      { _id: '1', name: 'CREATED', description: 'Created' },
    ];
    it('should create a shipment', (done) => {
      // Act
      jest.spyOn(statusRepository, 'findAll').mockReturnValueOnce(of(status));
      jest.spyOn(shipmentRepository, 'create').mockReturnValueOnce(of(entity));
      const result$ = shipmentService.createShipment(entity);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(statusRepository.findAll).toHaveBeenCalled();
          expect(shipmentRepository.create).toHaveBeenCalledWith(entity);
          expect(result).toEqual(entity);
          done();
        },
      });
    });

    it('should throw a NotFoundException when status is not found', (done) => {
      // Arrange
      status = [];
      jest.spyOn(statusRepository, 'findAll').mockReturnValueOnce(of(status));

      // Act
      const result$ = shipmentService.createShipment(entity);

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(statusRepository.findAll).toHaveBeenCalled();
          expect(shipmentRepository.create).not.toHaveBeenCalled();
          done();
        },
      });
    });
  });

  describe('getShipmentById', () => {
    it('should return a shipment by ID', (done) => {
      // Arrange
      const shipment: ShipmentMongoModel = {
        _id: '1',
        user: {} as any,
      } as unknown as ShipmentMongoModel;
      jest
        .spyOn(shipmentRepository, 'findOneById')
        .mockReturnValueOnce(of(shipment));

      // Act
      const result$ = shipmentService.getShipmentById(shipment._id);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(shipmentRepository.findOneById).toHaveBeenCalledWith(
            shipment._id,
          );
          expect(result).toEqual(shipment);
          done();
        },
      });
    });
  });

  describe('getAllShipments', () => {
    it('should return all shipments', (done) => {
      // Arrange
      const shipments: ShipmentMongoModel[] = [
        {
          _id: '1',
          user: { _id: '123' } as any,
        } as unknown as ShipmentMongoModel,
        {
          _id: '2',
          user: { _id: '123' } as any,
        } as unknown as ShipmentMongoModel,
      ];
      jest
        .spyOn(shipmentRepository, 'findAll')
        .mockReturnValueOnce(of(shipments));

      // Act
      const result$ = shipmentService.getAllShipments();

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(shipmentRepository.findAll).toHaveBeenCalled();
          expect(result).toEqual(shipments);
          done();
        },
      });
    });
  });

  describe('update Shipment', () => {
    it('should update a shipment', (done) => {
      // Arrange
      const shipment: ShipmentMongoModel = {
        _id: '1',
        user: { _id: '123' } as any,
      } as unknown as ShipmentMongoModel;
      jest
        .spyOn(shipmentRepository, 'update')
        .mockReturnValueOnce(of(shipment));

      // Act
      const result$ = shipmentService.updateShipment(shipment._id, shipment);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(shipmentRepository.update).toHaveBeenCalledWith(
            shipment._id,
            shipment,
          );
          expect(result).toEqual(shipment);
          done();
        },
      });
    });
  });

  describe('delete Shipment', () => {
    it('should delete a shipment', (done) => {
      // Arrange
      const shipment: ShipmentMongoModel = {
        _id: '1',
      } as unknown as ShipmentMongoModel;
      jest
        .spyOn(shipmentRepository, 'delete')
        .mockReturnValueOnce(of(shipment));

      // Act
      const result$ = shipmentService.deleteShipment(shipment._id);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(shipmentRepository.delete).toHaveBeenCalledWith(shipment._id);
          expect(result).toEqual(shipment);
          done();
        },
      });
    });
  });
});
