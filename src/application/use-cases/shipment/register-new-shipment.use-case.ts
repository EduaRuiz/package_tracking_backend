import { Observable, of, switchMap, throwError } from 'rxjs';
import { IUseCase } from '../interface';
import { ShipmentDomainEntity, UserDomainEntity } from 'src/domain/entities';
import {
  IShipmentDomainService,
  IUserDomainService,
} from 'src/domain/services';
import { IRegisterNewShipmentDto } from 'src/domain/dto';
import { NotFoundException } from '@nestjs/common';

/**
 * Register new shipment use case
 *
 * @export
 * @class RegisterNewShipmentUseCase
 * @typedef {RegisterNewShipmentUseCase}
 * @implements {IUseCase}
 */
export class RegisterNewShipmentUseCase implements IUseCase {
  /**
   * Creates an instance of RegisterNewShipmentUseCase.
   *
   * @constructor
   * @param {IShipmentDomainService} shipment$ Shipment domain service
   * @param {IUserDomainService} user$ User domain service
   */
  constructor(
    private readonly shipment$: IShipmentDomainService,
    private readonly user$: IUserDomainService,
  ) {}

  /**
   * Register new shipment if the user id provided as argument to the method execute
   *
   * @param {IRegisterNewShipmentDto} dto Register new shipment dto
   * @param {string} userId User id
   * @returns {Observable<ShipmentDomainEntity>} Shipment domain entity
   */
  execute(
    dto: IRegisterNewShipmentDto,
    userId: string,
  ): Observable<ShipmentDomainEntity> {
    return !!dto.userId && dto.userId !== userId
      ? throwError(() => new NotFoundException('User not found'))
      : this.validateUserExists(userId).pipe(
          switchMap((user: UserDomainEntity) => this.createShipment(dto, user)),
        );
  }

  /**
   * Validate if the user exists
   *
   * @private
   * @param {string} userId User id
   * @returns {Observable<UserDomainEntity>} User domain entity
   */
  private validateUserExists(userId: string): Observable<UserDomainEntity> {
    return this.user$.getUserById(userId).pipe(
      switchMap((user: UserDomainEntity) => {
        return user._id.toString() !== userId.toString()
          ? throwError(() => new NotFoundException('User not found'))
          : of(user);
      }),
    );
  }

  /**
   * Create shipment domain entity and save it
   *
   * @private
   * @param {IRegisterNewShipmentDto} dto Register new shipment dto
   * @param {UserDomainEntity} user User domain entity
   * @returns {Observable<ShipmentDomainEntity>} Shipment domain entity created
   */
  private createShipment(
    dto: IRegisterNewShipmentDto,
    user: UserDomainEntity,
  ): Observable<ShipmentDomainEntity> {
    const shipment: ShipmentDomainEntity = {
      description: dto.description,
      user,
      originAddress: dto.originAddress,
      destinationAddress: dto.destinationAddress,
      status: {
        name: 'CREATED',
        description: 'Shipment created',
      },
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    return this.shipment$.createShipment(shipment);
  }
}
