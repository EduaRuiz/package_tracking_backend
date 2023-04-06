import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { of, throwError } from 'rxjs';
import { getModelToken } from '@nestjs/mongoose';
import { UserMongoRepository } from '..';
import { UserMongoModel } from '../../models';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('UserMongoRepository', () => {
  let repository: UserMongoRepository;
  let model: Model<UserMongoModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserMongoRepository,
        {
          provide: getModelToken(UserMongoModel.name),
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

    repository = module.get<UserMongoRepository>(UserMongoRepository);
    model = module.get<Model<UserMongoModel>>(
      getModelToken(UserMongoModel.name),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', (done) => {
      // Arrange
      const entity = {} as unknown as UserMongoModel;
      const createdUser = { ...entity } as unknown as UserMongoModel;
      jest.spyOn(model, 'create').mockReturnValueOnce(of(createdUser) as any);

      // Act
      const result$ = repository.create(entity);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(createdUser);
          expect(model.create).toHaveBeenCalledWith(entity);
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entity: UserMongoModel = {} as any;
      const message = 'Conflict while creating user';
      const error = new MongoServerError(new Error(message));
      jest.spyOn(model, 'create').mockReturnValueOnce(throwError(error) as any);

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
    it('should update a user', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as UserMongoModel;
      const existingUser = { ...entity } as unknown as UserMongoModel;
      const updatedUser = { ...entity } as unknown as UserMongoModel;
      jest.spyOn(model, 'findById').mockReturnValueOnce(entity as any);
      jest.spyOn(repository, 'findOneById').mockReturnValueOnce(of(entity));
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockReturnValueOnce(of(updatedUser) as any);

      // Act
      const result$ = repository.update(entityId, entity);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(updatedUser);
          expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
            { _id: entityId.toString() },
            { ...existingUser, ...entity, _id: entityId },
            { new: true },
          );
          done();
        },
      });
    });

    it('should throw a MongoServerError when there is a conflict', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as UserMongoModel;
      const message = 'Conflict while updating user';
      const error = new MongoServerError(new Error(message));
      jest.spyOn(model, 'findById').mockReturnValueOnce(entity as any);
      jest.spyOn(repository, 'findOneById').mockReturnValueOnce(of(entity));
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockReturnValueOnce(throwError(error) as any);

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
    it('should delete a user', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as UserMongoModel;
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
      const entity = {} as unknown as UserMongoModel;
      const message = 'Conflict while deleting user';
      const error = new MongoServerError(new Error(message));
      jest.spyOn(model, 'findById').mockReturnValueOnce(entity as any);
      jest.spyOn(repository, 'findOneById').mockReturnValueOnce(of(entity));
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockReturnValueOnce(throwError(error) as any);

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
    it('should return all user', (done) => {
      // Arrange
      const entities = [
        {} as unknown as UserMongoModel,
        {} as unknown as UserMongoModel,
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
      const message = 'Conflict while getting user list';
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
    it('should return a user', (done) => {
      // Arrange
      const entityId = '123';
      const entity = {} as unknown as UserMongoModel;
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
      const message = 'Conflict while getting user by id';
      const error = new MongoServerError(new Error(message));
      jest
        .spyOn(model, 'findById')
        .mockReturnValueOnce(throwError(error) as any);

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

    it('should throw a NotFoundException when there is no user', (done) => {
      // Arrange
      const entityId = '123';
      const message = 'User not found!';
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
