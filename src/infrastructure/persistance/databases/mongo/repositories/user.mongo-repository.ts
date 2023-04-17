import {
  Observable,
  catchError,
  from,
  iif,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { IRepositoryBase } from './interfaces';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserMongoModel } from '../models';
import { MongoServerError } from 'mongodb';

/**
 * User Mongo Repository class
 *
 * @export
 * @class UserMongoRepository
 * @typedef {UserMongoRepository}
 * @implements {IRepositoryBase<UserMongoModel>}
 */
export class UserMongoRepository implements IRepositoryBase<UserMongoModel> {
  /**
   * Creates an instance of UserMongoRepository.
   *
   * @constructor
   * @param {Model<UserMongoModel>} stockMongoModel The user Mongo model
   */
  constructor(
    @InjectModel(UserMongoModel.name)
    private stockMongoModel: Model<UserMongoModel>,
  ) {}

  /**
   * Creates a new user
   *
   * @param {UserMongoModel} entity The user to be created
   * @returns {Observable<UserMongoModel>} The user created
   */
  create(entity: UserMongoModel): Observable<UserMongoModel> {
    return from(this.stockMongoModel.create(entity)).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while creating user');
        throw new MongoServerError(error);
      }),
    );
  }

  /**
   * Updates a user
   *
   * @param {string} entityId The user id to update
   * @param {UserMongoModel} entity The user to update
   * @returns {Observable<UserMongoModel>} The user updated
   */
  update(entityId: string, entity: UserMongoModel): Observable<UserMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap((user: UserMongoModel) => {
        return from(
          this.stockMongoModel.findByIdAndUpdate(
            { _id: entityId.toString() },
            { ...user, ...entity, _id: entityId },
            { new: true },
          ),
        ).pipe(
          catchError((error: MongoServerError) => {
            error.cause = new Error('Conflict while updating user');
            throw new MongoServerError(error);
          }),
        );
      }),
    );
  }

  /**
   * Deletes a user
   *
   * @param {string} entityId The user id to delete
   * @returns {Observable<UserMongoModel>} The user deleted
   */
  delete(entityId: string): Observable<UserMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap(() => {
        return from(
          this.stockMongoModel.findByIdAndDelete({
            _id: entityId.toString(),
          }),
        ).pipe(
          catchError((error: MongoServerError) => {
            error.cause = new Error('Conflict while deleting user');
            throw new MongoServerError(error);
          }),
        );
      }),
    );
  }

  /**
   * Gets all users
   *
   * @returns {Observable<UserMongoModel[]>} The user list
   */
  findAll(): Observable<UserMongoModel[]> {
    return from(this.stockMongoModel.find().exec()).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting user list');
        throw new MongoServerError(error);
      }),
    );
  }

  /**
   * Gets a user by id
   *
   * @param {string} entityId The user id to get
   * @returns {Observable<UserMongoModel>} The user found
   */
  findOneById(entityId: string): Observable<UserMongoModel> {
    return from(
      this.stockMongoModel.findById({ _id: entityId.toString() }),
    ).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting user by id');
        throw new MongoServerError(error);
      }),
      switchMap((user: UserMongoModel) =>
        iif(
          () => user === null,
          throwError(() => new NotFoundException('User not found!')),
          of(user),
        ),
      ),
    );
  }
}
