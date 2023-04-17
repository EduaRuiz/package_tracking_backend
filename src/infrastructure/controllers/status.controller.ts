import {
  ShipmentService,
  StatusService,
  UserService,
} from '../persistance/services';
import { AuthService } from '../utils/services';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../utils/guards';
import { ValidateMongoId } from '../utils/validators';
import { StatusEntity } from '../persistance/entities';
import { Observable } from 'rxjs';
import { NewStatusDto, UpdateStatusDto } from '../utils/dto';
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
  StatusSwaggerEntity,
  UnauthorizedSwagger,
} from '@infrastructure/utils/swagger-types';

/**
 * Status controller class that handles all the status related endpoints of the API and
 * delegates the logic to the PackageTrackingDelegate class
 *
 * @export
 * @class StatusController
 * @typedef {StatusController}
 */
@Controller('status')
@ApiTags('Status API')
@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
export class StatusController {
  /**
   * PackageTrackingDelegate instance that handles the logic of the status endpoints of the API
   *
   * @private
   * @readonly
   * @type {PackageTrackingDelegate}
   */
  private readonly delegator: PackageTrackingDelegate;
  /**
   * Creates an instance of StatusController.
   *
   * @constructor
   * @param {StatusService} status$ StatusService instance
   * @param {ShipmentService} shipment$ ShipmentService instance
   * @param {UserService} user$ UserService instance
   * @param {AuthService} auth$ AuthService instance
   */
  constructor(
    private readonly status$: StatusService,
    private readonly shipment$: ShipmentService,
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
   * Get a status by its id
   *
   * @param {string} statusId Status id
   * @returns {Observable<StatusEntity>} Observable that emits the status
   */
  @Get(':id')
  @ApiOperation({
    summary:
      'Return a status by its id. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description: 'Status consult successfully',
    type: StatusSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Status consult failed. Please check the shipment id and try again',
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
  getStatus(
    @Param('id', ValidateMongoId) statusId: string,
  ): Observable<StatusEntity> {
    this.delegator.toGetStatus();
    return this.delegator.execute(statusId);
  }

  /**
   * Update a status by its id and new data
   *
   * @param {string} statusId Status id
   * @param {UpdateStatusDto} dto New status data
   * @returns {Observable<StatusEntity>} Observable that emits the updated status
   */
  @Patch(':id')
  @ApiOperation({
    summary:
      'Update a status by its id. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description: 'Status update successfully',
    type: StatusSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Status update failed. Please check the shipment id and try again',
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
  updateStatus(
    @Param('id', ValidateMongoId) statusId: string,
    @Body() dto: UpdateStatusDto,
  ): Observable<StatusEntity> {
    this.delegator.toUpdateStatus();
    return this.delegator.execute(dto, statusId);
  }

  /**
   * Register a new status
   *
   * @param {NewStatusDto} dto New status data
   * @returns {Observable<StatusEntity>} Observable that emits the new status
   */
  @Post('register')
  @ApiOperation({
    summary:
      'Register a new status. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description: 'Status register successfully',
    type: StatusSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Status register failed. Please check the shipment id and try again',
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
  createStatus(@Body() dto: NewStatusDto): Observable<StatusEntity> {
    this.delegator.toRegisterNewStatus();
    return this.delegator.execute(dto);
  }

  /**
   * Delete a status by its id
   *
   * @param {string} statusId Status id
   * @returns {Observable<StatusEntity>} Observable that emits the deleted status
   */
  @Delete(':id')
  @ApiOperation({
    summary:
      'Delete a status by its id. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description: 'Status delete successfully',
    type: StatusSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Status delete failed. Please check the shipment id and try again',
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
  deleteStatus(
    @Param('id', ValidateMongoId) statusId: string,
  ): Observable<StatusEntity> {
    this.delegator.toDeleteStatus();
    return this.delegator.execute(statusId);
  }
}
