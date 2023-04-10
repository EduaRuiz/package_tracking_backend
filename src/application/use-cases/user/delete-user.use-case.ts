import {
  IShipmentDomainService,
  IUserDomainService,
} from 'src/domain/services';
import { IUseCase } from '../interface';
import { UserDomainEntity } from 'src/domain/entities';
import { Observable, switchMap, throwError } from 'rxjs';
import { ConflictException } from '@nestjs/common';

export class DeleteUserUseCase implements IUseCase {
  constructor(
    private readonly user$: IUserDomainService,
    private readonly shipment$: IShipmentDomainService,
  ) {}

  execute(userId: string): Observable<UserDomainEntity> {
    return this.shipment$.getAllShipments().pipe(
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
