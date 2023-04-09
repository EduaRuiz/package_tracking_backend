import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { of, throwError } from 'rxjs';
import { getModelToken } from '@nestjs/mongoose';
import { StatusMongoRepository } from '..';
import { StatusMongoModel } from '../../models';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('StatusMongoRepository', () => {
  let repository: StatusMongoRepository;
  let model: Model<StatusMongoModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusMongoRepository,
        {
          provide: getModelToken(StatusMongoModel.name),
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

    repository = module.get<StatusMongoRepository>(StatusMongoRepository);
    model = module.get<Model<StatusMongoModel>>(
      getModelToken(StatusMongoModel.name),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a status', (done) => {
      // Arrange
      const entity = {} as unknown as StatusMongoModel;
      const createdStatus = { ...entity } as unknown as StatusMongoModel;
      jest.spyOn(model, 'create').mockReturnValueOnce(of(createdStatus) as any);

      // Act
      const result$ = repository.create(entity);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(createdStatus);
          expect(model.create).toHaveBeenCalledWith(entity);
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entity: StatusMongoModel = {} as any;
      const message = 'Conflict while creating status';
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
    it('should update a status', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as StatusMongoModel;
      const existingStatus = { ...entity } as unknown as StatusMongoModel;
      const updatedStatus = { ...entity } as unknown as StatusMongoModel;
      jest.spyOn(model, 'findById').mockReturnValueOnce(entity as any);
      jest.spyOn(repository, 'findOneById').mockReturnValueOnce(of(entity));
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockReturnValueOnce(of(updatedStatus) as any);

      // Act
      const result$ = repository.update(entityId, entity);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(updatedStatus);
          expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
            { _id: entityId.toString() },
            { ...existingStatus, ...entity, _id: entityId },
            { new: true },
          );
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as StatusMongoModel;
      const message = 'Conflict while updating status';
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
    it('should delete a status', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as StatusMongoModel;
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
      const entity = {} as unknown as StatusMongoModel;
      const message = 'Conflict while deleting status';
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
    it('should return all status', (done) => {
      // Arrange
      const entities = [
        {} as unknown as StatusMongoModel,
        {} as unknown as StatusMongoModel,
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
          expect(model.find).toHaveBeenCalledWith();
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const message = 'Conflict while getting status list';
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
    it('should return a status', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as StatusMongoModel;
      jest.spyOn(model, 'findById').mockReturnValueOnce(of(entity) as any);

      // Act
      const result$ = repository.findOneById(entityId);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(entity);
          expect(model.findById).toHaveBeenCalledWith({ _id: entityId });
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entityId = '123';
      const message = 'Conflict while getting status by id';
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

    it('should throw a NotFoundException when there is no status', (done) => {
      // Arrange
      const entityId = '123';
      const message = 'Status not found!';
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
