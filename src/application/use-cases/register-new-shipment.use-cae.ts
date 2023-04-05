import { Observable, of, switchMap, throwError } from 'rxjs';
import { IUseCase } from './interface';
import { ShipmentDomainEntity, UserDomainEntity } from 'src/domain/entities';
import {
  IShipmentDomainService,
  IUserDomainService,
} from 'src/domain/services';
import { IRegisterNewShipmentDto } from 'src/domain/dto';
import { NotFoundException } from '@nestjs/common';

export class RegisterNewShipmentUseCase implements IUseCase {
  constructor(
    private readonly shipmentDomain$: IShipmentDomainService,
    private readonly userDomain$: IUserDomainService,
  ) {}

  execute(
    dto: IRegisterNewShipmentDto,
    userId: string,
  ): Observable<ShipmentDomainEntity> {
    dto.userId !== userId ??
      throwError(new NotFoundException('User not found'));
    return this.validateUserExists(userId).pipe(
      switchMap((user: UserDomainEntity) => this.createShipment(dto, user)),
    );
  }

  private validateUserExists(userId: string): Observable<UserDomainEntity> {
    return this.userDomain$.getUserById(userId).pipe(
      switchMap((user: UserDomainEntity) => {
        return user.id !== userId
          ? throwError(new NotFoundException('User not found'))
          : of(user);
      }),
    );
  }

  private createShipment(
    dto: IRegisterNewShipmentDto,
    user: UserDomainEntity,
  ): Observable<ShipmentDomainEntity> {
    const shipment: ShipmentDomainEntity = {
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
    return this.shipmentDomain$.createShipment(shipment);
  }
}
