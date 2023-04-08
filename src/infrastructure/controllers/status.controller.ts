import { PackageTrackingDelegate } from 'src/application/delegates';
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

@Controller('status')
@UseGuards(JwtGuard)
export class StatusController {
  private readonly delegator: PackageTrackingDelegate;
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

  @Get(':id')
  getStatus(
    @Param('id', ValidateMongoId) statusId: string,
  ): Observable<StatusEntity> {
    this.delegator.toGetStatus();
    return this.delegator.execute(statusId);
  }

  @Patch(':id')
  updateStatus(
    @Param('id', ValidateMongoId) statusId: string,
    @Body() dto: UpdateStatusDto,
  ): Observable<StatusEntity> {
    this.delegator.toUpdateStatus();
    return this.delegator.execute(dto, statusId);
  }

  @Post('register')
  createStatus(@Body() dto: NewStatusDto): Observable<StatusEntity> {
    this.delegator.toRegisterNewStatus();
    return this.delegator.execute(dto);
  }

  @Delete(':id')
  deleteStatus(
    @Param('id', ValidateMongoId) statusId: string,
  ): Observable<StatusEntity> {
    this.delegator.toDeleteStatus();
    return this.delegator.execute(statusId);
  }
}
