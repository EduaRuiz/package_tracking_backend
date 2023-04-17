import {
  IShipmentDomainService,
  IUserDomainService,
} from 'src/domain/services';
import { IUseCase } from '../interface';
import { UserDomainEntity } from 'src/domain/entities';
import { Observable, switchMap, throwError } from 'rxjs';
import { ConflictException } from '@nestjs/common';

/**
 * Delete user use case (business rule: cannot delete other user)
 *
 * @export
 * @class DeleteUserUseCase
 * @typedef {DeleteUserUseCase}
 * @implements {IUseCase}
 */
export class DeleteUserUseCase implements IUseCase {
  /**
   * Creates an instance of DeleteUserUseCase.
   *
   * @constructor
   * @param {IUserDomainService} user$ User domain service
   * @param {IShipmentDomainService} shipment$ Shipment domain service
   */
  constructor(
    private readonly user$: IUserDomainService,
    private readonly shipment$: IShipmentDomainService,
  ) {}

  /**
   * Delete user by id if it is not in use by any shipment
   *
   * @param {string} userId User id
   * @param {string} currentUserId Current user id
   * @returns {Observable<UserDomainEntity>} User domain entity deleted
   */
  execute(userId: string, currentUserId: string): Observable<UserDomainEntity> {
    return userId !== currentUserId
      ? throwError(new ConflictException('Cannot delete other user'))
      : this.shipment$.getAllShipments().pipe(
          switchMap((shipments) => {
            const shipment = shipments.find(
              (shipment) =>
                shipment.user._id.toString() === userId &&
                shipment.status.name !== 'FINALIZED',
            );
            return !shipment
              ? this.user$.deleteUser(userId)
              : throwError(
                  () =>
                    new ConflictException(
                      'Cannot delete user because it has minimum one shipment with status different to FINALIZED status',
                    ),
                );
          }),
        );
  }
}
