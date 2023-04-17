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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BadRequestSwagger,
  ConflictSwagger,
  NotFoundSwagger,
  ShipmentSwaggerEntity,
  UnauthorizedSwagger,
} from '@infrastructure/utils/swagger-types';

/**
 * Shipment controller class that handles all the shipment related endpoints of the API
 * and delegates the logic to the PackageTrackingDelegate class
 *
 * @export
 * @class ShipmentController
 * @typedef {ShipmentController}
 */
@Controller('shipment')
@ApiTags('Shipment API')
@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
export class ShipmentController {
  /**
   * PackageTrackingDelegate instance that handles the logic of the shipment endpoints of the API
   *
   * @private
   * @readonly
   * @type {PackageTrackingDelegate}
   */
  private readonly delegator: PackageTrackingDelegate;

  /**
   * Creates an instance of ShipmentController.
   *
   * @constructor
   * @param {ShipmentService} shipment$ ShipmentService instance
   * @param {StatusService} status$ StatusService instance
   * @param {UserService} user$ UserService instance
   * @param {AuthService} auth$ AuthService instance
   */
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

  /**
   * Get all shipments in the system by user id
   *
   * @param {string} userId User id
   * @returns {Observable<ShipmentEntity[]>} Observable of ShipmentEntity[]
   */
  @Get('all')
  @ApiOperation({
    summary:
      'Return all shipments in the system. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description: 'Shipment consult successfully',
    type: ShipmentSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Shipment consult failed. Please check the shipment id and try again',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
    type: ConflictSwagger,
  })
  getShipments(@UserId('id') userId: string): Observable<ShipmentEntity[]> {
    this.delegator.toGetShipmentsByUser();
    return this.delegator.execute(userId);
  }

  /**
   * Get a shipment by its id
   *
   * @param {string} shipmentId Shipment id
   * @param {string} userId User id
   * @returns {Observable<ShipmentEntity>} Observable of ShipmentEntity
   */
  @Get(':id')
  @ApiOperation({
    summary:
      'Return a shipment by its id. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description: 'Shipment consult successfully',
    type: ShipmentSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Shipment consult failed. Please check the shipment id and try again',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
    type: ConflictSwagger,
  })
  getShipment(
    @Param('id', ValidateMongoId) shipmentId: string,
    @UserId('id', ValidateMongoId) userId: string,
  ): Observable<ShipmentEntity> {
    this.delegator.toGetShipment();
    return this.delegator.execute(shipmentId, userId);
  }

  /**
   * Create a new shipment
   *
   * @param {RegisterNewShipmentDto} dto RegisterNewShipmentDto instance
   * @param {string} userId User id
   * @returns {Observable<ShipmentEntity>} Observable of ShipmentEntity
   */
  @Post('create')
  @ApiOperation({
    summary: 'Create a new shipment. This endpoint is only for testing purpose',
  })
  @ApiResponse({
    status: 200,
    description: 'Shipment creation successfully',
    type: ShipmentSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Shipment consult failed. Please check the shipment id and try again',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
    type: ConflictSwagger,
  })
  createShipment(
    @Body() dto: RegisterNewShipmentDto,
    @UserId('id', ValidateMongoId) userId: string,
  ): Observable<ShipmentEntity> {
    this.delegator.toRegisterNewShipment();
    return this.delegator.execute(dto, userId);
  }

  /**
   * Update a shipment by its id
   *
   * @param {string} shipmentId Shipment id
   * @param {UpdateShipmentDto} dto UpdateShipmentDto instance
   * @returns {Observable<ShipmentEntity>} Observable of ShipmentEntity
   */
  @Patch('update/:id')
  @ApiOperation({
    summary:
      'Update a shipment by its id. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description: 'Shipment update successfully',
    type: ShipmentSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Shipment consult failed. Please check the shipment id and try again',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
    type: ConflictSwagger,
  })
  updateShipment(
    @Param('id', ValidateMongoId) shipmentId: string,
    @Body() dto: UpdateShipmentDto,
  ): Observable<ShipmentEntity> {
    this.delegator.toUpdateShipment();
    return this.delegator.execute(shipmentId, dto);
  }

  /**
   * Delete a shipment by its id
   *
   * @param {string} shipmentId Shipment id
   * @param {string} userId User id
   * @returns {Observable<ShipmentEntity>}
   */
  @Delete('delete/:id')
  @ApiOperation({
    summary:
      'Delete a shipment by its id. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description: 'Shipment delete successfully',
    type: ShipmentSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Shipment consult failed. Please check the shipment id and try again',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
    type: ConflictSwagger,
  })
  deleteShipment(
    @Param('id', ValidateMongoId) shipmentId: string,
    @UserId('id', ValidateMongoId) userId: string,
  ): Observable<ShipmentEntity> {
    this.delegator.toDeleteShipment();
    return this.delegator.execute(shipmentId, userId);
  }
}
