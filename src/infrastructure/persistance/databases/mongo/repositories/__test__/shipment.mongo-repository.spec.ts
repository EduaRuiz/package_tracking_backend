import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { NotFoundError, of, throwError } from 'rxjs';
import { getModelToken } from '@nestjs/mongoose';
import { ShipmentMongoRepository } from '..';
import { ShipmentMongoModel } from '../../models';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('ShipmentMongoRepository', () => {
  let repository: ShipmentMongoRepository;
  let model: Model<ShipmentMongoModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShipmentMongoRepository,
        {
          provide: getModelToken(ShipmentMongoModel.name),
          useValue: {
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ShipmentMongoRepository>(ShipmentMongoRepository);
    model = module.get<Model<ShipmentMongoModel>>(
      getModelToken(ShipmentMongoModel.name),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a shipment', (done) => {
      // Arrange
      const entity = {} as unknown as ShipmentMongoModel;
      const createdShipment = { ...entity } as unknown as ShipmentMongoModel;
      jest
        .spyOn(model, 'create')
        .mockReturnValueOnce(of(createdShipment) as any);

      // Act
      const result$ = repository.create(entity);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(createdShipment);
          expect(model.create).toHaveBeenCalledWith(entity);
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entity: ShipmentMongoModel = {} as any;
      const message = 'Conflict while creating shipment';
      const error = new MongoServerError(new Error(message));
      jest
        .spyOn(model, 'create')
        .mockReturnValueOnce(throwError(() => error) as any);

      // Act
      const result$ = repository.create(entity);

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(MongoServerError);
          expect(err.message).toBe(message);
          expect(err.cause).toBeInstanceOf(Error);
          expect(err.cause.message).toBe(message);
          done();
        },
      });
    });
  });

  describe('update', () => {
    it('should update a shipment', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as ShipmentMongoModel;
      const existingShipment = { ...entity } as unknown as ShipmentMongoModel;
      const updatedShipment = { ...entity } as unknown as ShipmentMongoModel;
      jest.spyOn(model, 'findById').mockReturnValueOnce(entity as any);
      jest.spyOn(repository, 'findOneById').mockReturnValueOnce(of(entity));
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockReturnValueOnce(of(updatedShipment) as any);

      // Act
      const result$ = repository.update(entityId, entity);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(updatedShipment);
          expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
            { _id: entityId.toString() },
            { ...existingShipment, ...entity, _id: entityId },
            { new: true, populate: ['status', 'user'] },
          );
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as ShipmentMongoModel;
      const message = 'Conflict while updating shipment';
      const error = new MongoServerError(new Error(message));
      jest.spyOn(model, 'findById').mockReturnValueOnce(entity as any);
      jest.spyOn(repository, 'findOneById').mockReturnValueOnce(of(entity));
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockReturnValueOnce(throwError(() => error) as any);

      // Act
      const result$ = repository.update(entityId, entity);

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(MongoServerError);
          expect(err.message).toBe(message);
          expect(err.cause).toBeInstanceOf(Error);
          expect(err.cause.message).toBe(message);
          done();
        },
      });
    });
  });

  describe('delete', () => {
    it('should delete a shipment', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as ShipmentMongoModel;
      jest.spyOn(model, 'findById').mockReturnValueOnce(entity as any);
      jest.spyOn(repository, 'findOneById').mockReturnValueOnce(of(entity));
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockReturnValueOnce(of(entity) as any);

      // Act
      const result$ = repository.delete(entityId);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(entity);
          expect(model.findByIdAndDelete).toHaveBeenCalledWith({
            _id: entityId.toString(),
          });
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as ShipmentMongoModel;
      const message = 'Conflict while deleting shipment';
      const error = new MongoServerError(new Error(message));
      jest.spyOn(model, 'findById').mockReturnValueOnce(entity as any);
      jest.spyOn(repository, 'findOneById').mockReturnValueOnce(of(entity));
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockReturnValueOnce(throwError(() => error) as any);

      // Act
      const result$ = repository.delete(entityId);

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(MongoServerError);
          expect(err.message).toBe(message);
          expect(err.cause).toBeInstanceOf(Error);
          expect(err.cause.message).toBe(message);
          done();
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all shipments', (done) => {
      // Arrange
      const entities = [
        {} as unknown as ShipmentMongoModel,
        {} as unknown as ShipmentMongoModel,
      ];
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(entities),
      } as any);
      // Act
      const result$ = repository.findAll();

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(entities);
          expect(model.find).toHaveBeenCalledWith(
            {},
            {},
            { populate: ['status', 'user'] },
          );
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const message = 'Conflict while getting shipments list';
      const error = new MongoServerError(new Error(message));
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockRejectedValueOnce(error),
      } as any);

      // Act
      const result$ = repository.findAll();

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(MongoServerError);
          expect(err.message).toBe(message);
          expect(err.cause).toBeInstanceOf(Error);
          expect(err.cause.message).toBe(message);
          done();
        },
      });
    });
  });

  describe('findOneById', () => {
    it('should return a shipment', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as ShipmentMongoModel;
      jest.spyOn(model, 'findById').mockReturnValueOnce(of(entity) as any);

      // Act
      const result$ = repository.findOneById(entityId);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(entity);
          expect(model.findById).toHaveBeenCalledWith(
            { _id: entityId },
            {},
            { populate: ['status', 'user'] },
          );
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entityId = '123';
      const message = 'Conflict while getting shipment by id';
      const error = new MongoServerError(new Error(message));
      jest
        .spyOn(model, 'findById')
        .mockReturnValueOnce(throwError(() => error) as any);

      // Act
      const result$ = repository.findOneById(entityId);

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(MongoServerError);
          expect(err.message).toBe(message);
          expect(err.cause).toBeInstanceOf(Error);
          expect(err.cause.message).toBe(message);
          done();
        },
      });
    });

    it('should throw a NotFoundException when there is no shipment', (done) => {
      // Arrange
      const entityId = '123';
      const message = 'Shipment not found!';
      jest.spyOn(model, 'findById').mockReturnValueOnce(of(null) as any);

      // Act
      const result$ = repository.findOneById(entityId);

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toBe(message);
          done();
        },
      });
    });
  });
});
