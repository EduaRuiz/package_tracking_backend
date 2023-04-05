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

export class ShipmentMongoRepository
  implements IRepositoryBase<ShipmentMongoModel>
{
  constructor(
    @InjectModel(ShipmentMongoModel.name)
    private stockMongoModel: Model<ShipmentMongoModel>,
  ) {}

  create(entity: ShipmentMongoModel): Observable<ShipmentMongoModel> {
    return from(this.stockMongoModel.create(entity)).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while creating shipment');
        throw new MongoServerError(error);
      }),
    );
  }

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

  findOneById(entityId: string): Observable<ShipmentMongoModel> {
    return from(
      this.stockMongoModel
        .findById(
          { _id: entityId.toString() },
          {},
          { populate: ['status', 'user'] },
        )
        .exec(),
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
