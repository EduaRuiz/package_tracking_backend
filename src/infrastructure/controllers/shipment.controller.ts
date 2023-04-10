import {
  ShipmentService,
  StatusService,
  UserService,
} from '../persistance/services';
import { AuthService } from '../utils/services';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { JwtGuard } from '../utils/guards';
import { UserId } from '../utils/decorators';
import { Observable } from 'rxjs';
import { ShipmentEntity } from '../persistance/entities';
import { ValidateMongoId } from '../utils/validators';
import { RegisterNewShipmentDto, UpdateShipmentDto } from '../utils/dto';
import { PackageTrackingDelegate } from '@application/delegates';

@Controller('shipment')
@UseGuards(JwtGuard)
export class ShipmentController {
  private readonly delegator: PackageTrackingDelegate;

  constructor(
    private readonly shipment$: ShipmentService,
    private readonly status$: StatusService,
    private readonly user$: UserService,
    private readonly auth$: AuthService,
  ) {
    this.delegator = new PackageTrackingDelegate(
      this.user$,
      this.shipment$,
      this.status$,
      this.auth$,
    );
  }

  @Get('all')
  getShipments(@UserId('id') userId: string): Observable<ShipmentEntity[]> {
    this.delegator.toGetShipmentsByUser();
    return this.delegator.execute(userId);
  }

  @Get(':id')
  getShipment(
    @Param('id', ValidateMongoId) shipmentId: string,
    @UserId('id', ValidateMongoId) userId: string,
  ): Observable<ShipmentEntity> {
    this.delegator.toGetShipment();
    return this.delegator.execute(shipmentId, userId);
  }

  @Post('create')
  createShipment(
    @Body() dto: RegisterNewShipmentDto,
    @UserId('id', ValidateMongoId) userId: string,
  ): Observable<ShipmentEntity> {
    this.delegator.toRegisterNewShipment();
    return this.delegator.execute(dto, userId);
  }

  @Patch('update/:id')
  updateShipment(
    @Param('id', ValidateMongoId) shipmentId: string,
    @Body() dto: UpdateShipmentDto,
  ): Observable<ShipmentEntity> {
    this.delegator.toUpdateShipment();
    return this.delegator.execute(shipmentId, dto);
  }

  @Delete('delete/:id')
  deleteShipment(
    @Param('id', ValidateMongoId) shipmentId: string,
    @UserId('id', ValidateMongoId) userId: string,
  ): Observable<ShipmentEntity> {
    this.delegator.toDeleteShipment();
    return this.delegator.execute(shipmentId, userId);
  }
}
