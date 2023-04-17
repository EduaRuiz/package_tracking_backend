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
import { ShipmentMongoModel } from '../models';
import { MongoServerError } from 'mongodb';

/**
 * Shipment Mongo Repository class
 *
 * @export
 * @class ShipmentMongoRepository
 * @typedef {ShipmentMongoRepository}
 * @implements {IRepositoryBase<ShipmentMongoModel>}
 */
export class ShipmentMongoRepository
  implements IRepositoryBase<ShipmentMongoModel>
{
  /**
   * Creates an instance of ShipmentMongoRepository.
   *
   * @constructor
   * @param {Model<ShipmentMongoModel>} stockMongoModel The shipment Mongo model
   */
  constructor(
    @InjectModel(ShipmentMongoModel.name)
    private stockMongoModel: Model<ShipmentMongoModel>,
  ) {}

  /**
   * Creates a shipment
   *
   * @param {ShipmentMongoModel} entity The shipment to create
   * @returns {Observable<ShipmentMongoModel>} The shipment created
   */
  create(entity: ShipmentMongoModel): Observable<ShipmentMongoModel> {
    return from(this.stockMongoModel.create(entity)).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while creating shipment');
        throw new MongoServerError(error);
      }),
    );
  }

  /**
   * Updates a shipment
   *
   * @param {string} entityId The shipment id to update
   * @param {ShipmentMongoModel} entity The shipment to update
   * @returns {Observable<ShipmentMongoModel>} The shipment updated
   */
  update(
    entityId: string,
    entity: ShipmentMongoModel,
  ): Observable<ShipmentMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap((shipment: ShipmentMongoModel) => {
        return from(
          this.stockMongoModel.findByIdAndUpdate(
            { _id: entityId.toString() },
            { ...shipment, ...entity, _id: entityId },
            { new: true, populate: ['status', 'user'] },
          ),
        ).pipe(
          catchError((error: MongoServerError) => {
            error.cause = new Error('Conflict while updating shipment');
            throw new MongoServerError(error);
          }),
        );
      }),
    );
  }

  /**
   * Deletes a shipment
   *
   * @param {string} entityId The shipment id to delete
   * @returns {Observable<ShipmentMongoModel>} The shipment deleted
   */
  delete(entityId: string): Observable<ShipmentMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap(() => {
        return from(
          this.stockMongoModel.findByIdAndDelete({
            _id: entityId.toString(),
          }),
        ).pipe(
          catchError((error: MongoServerError) => {
            error.cause = new Error('Conflict while deleting shipment');
            throw new MongoServerError(error);
          }),
        );
      }),
    );
  }

  /**
   * Gets all shipments
   *
   * @returns {Observable<ShipmentMongoModel[]>} The shipments list
   */
  findAll(): Observable<ShipmentMongoModel[]> {
    return from(
      this.stockMongoModel
        .find({}, {}, { populate: ['status', 'user'] })
        .exec(),
    ).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting shipments list');
        throw new MongoServerError(error);
      }),
    );
  }

  /**
   * Gets a shipment by id
   *
   * @param {string} entityId The shipment id to get
   * @returns {Observable<ShipmentMongoModel>} The shipment found
   */
  findOneById(entityId: string): Observable<ShipmentMongoModel> {
    return from(
      this.stockMongoModel.findById(
        { _id: entityId.toString() },
        {},
        { populate: ['status', 'user'] },
      ),
    ).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting shipment by id');
        throw new MongoServerError(error);
      }),
      switchMap((shipment: ShipmentMongoModel) =>
        iif(
          () => shipment === null,
          throwError(() => new NotFoundException('Shipment not found!')),
          of(shipment),
        ),
      ),
    );
  }
}
