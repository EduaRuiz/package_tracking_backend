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

export class ShipmentMongoRepository
  implements IRepositoryBase<ShipmentMongoModel>
{
  constructor(
    @InjectModel(ShipmentMongoModel.name)
    private stockMongoModel: Model<ShipmentMongoModel>,
  ) {}

  create(entity: ShipmentMongoModel): Observable<ShipmentMongoModel> {
    return from(this.stockMongoModel.create(entity)).pipe(
      catchError((error: Error) => {
        error.message = 'Conflict while creating shipment';
        throw error;
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
          catchError((error: Error) => {
            error.message = 'Conflict while updating shipment';
            throw error;
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
          catchError((error: Error) => {
            error.message = 'Conflict while deleting shipment';
            throw error;
          }),
        );
      }),
    );
  }

  findAll(): Observable<ShipmentMongoModel[]> {
    return from(
      this.stockMongoModel
        .find({
          populate: ['status', 'user'],
        })
        .exec(),
    ).pipe(
      catchError((error: Error) => {
        error.message = 'Error while getting shipment list';
        throw error;
      }),
    );
  }

  findOneById(entityId: string): Observable<ShipmentMongoModel> {
    return from(
      this.stockMongoModel
        .findById(
          { _id: entityId.toString() },
          { populate: ['status', 'user'] },
        )
        .exec(),
    ).pipe(
      catchError((error: Error) => {
        error.message = 'Conflict while getting shipment by ID';
        throw error;
      }),
      switchMap((shipment: ShipmentMongoModel) =>
        iif(
          () => shipment === null,
          throwError(() => new NotFoundException('Shipment not found')),
          of(shipment),
        ),
      ),
    );
  }
}
