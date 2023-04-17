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
import { StatusMongoModel } from '../models';
import { MongoServerError } from 'mongodb';

/**
 * Status Mongo Repository class
 *
 * @export
 * @class StatusMongoRepository
 * @typedef {StatusMongoRepository}
 * @implements {IRepositoryBase<StatusMongoModel>}
 */
export class StatusMongoRepository
  implements IRepositoryBase<StatusMongoModel>
{
  /**
   * Creates an instance of StatusMongoRepository.
   *
   * @constructor
   * @param {Model<StatusMongoModel>} stockMongoModel The status Mongo model
   */
  constructor(
    @InjectModel(StatusMongoModel.name)
    private stockMongoModel: Model<StatusMongoModel>,
  ) {}

  /**
   * Creates a status
   *
   * @param {StatusMongoModel} entity The status to create
   * @returns {Observable<StatusMongoModel>} The status created
   */
  create(entity: StatusMongoModel): Observable<StatusMongoModel> {
    return from(this.stockMongoModel.create(entity)).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while creating status');
        throw new MongoServerError(error);
      }),
    );
  }

  /**
   * Updates a status
   *
   * @param {string} entityId The status id to update
   * @param {StatusMongoModel} entity The status to update
   * @returns {Observable<StatusMongoModel>} The status updated
   */
  update(
    entityId: string,
    entity: StatusMongoModel,
  ): Observable<StatusMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap((status: StatusMongoModel) => {
        return from(
          this.stockMongoModel.findByIdAndUpdate(
            { _id: entityId.toString() },
            { ...status, ...entity, _id: entityId },
            { new: true },
          ),
        ).pipe(
          catchError((error: MongoServerError) => {
            error.cause = new Error('Conflict while updating status');
            throw new MongoServerError(error);
          }),
        );
      }),
    );
  }

  /**
   * Deletes a status
   *
   * @param {string} entityId The status id to delete
   * @returns {Observable<StatusMongoModel>} The status deleted
   */
  delete(entityId: string): Observable<StatusMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap(() => {
        return from(
          this.stockMongoModel.findByIdAndDelete({
            _id: entityId.toString(),
          }),
        ).pipe(
          catchError((error: MongoServerError) => {
            error.cause = new Error('Conflict while deleting status');
            throw new MongoServerError(error);
          }),
        );
      }),
    );
  }

  /**
   * Gets all status
   *
   * @returns {Observable<StatusMongoModel[]>} All status list
   */
  findAll(): Observable<StatusMongoModel[]> {
    return from(this.stockMongoModel.find().exec()).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting status list');
        throw new MongoServerError(error);
      }),
    );
  }

  /**
   * Gets a status by id
   *
   * @param {string} entityId The status id to get
   * @returns {Observable<StatusMongoModel>} The status found
   */
  findOneById(entityId: string): Observable<StatusMongoModel> {
    return from(
      this.stockMongoModel.findById({ _id: entityId.toString() }),
    ).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting status by id');
        throw new MongoServerError(error);
      }),
      switchMap((status: StatusMongoModel) =>
        iif(
          () => status === null,
          throwError(() => new NotFoundException('Status not found!')),
          of(status),
        ),
      ),
    );
  }
}
