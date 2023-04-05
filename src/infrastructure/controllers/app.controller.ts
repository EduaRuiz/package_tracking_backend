import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ShipmentService,
  StatusService,
  UserService,
} from '../persistance/services';
import {
  RegisterNewShipmentDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
} from '../utils/dto';
import { Observable } from 'rxjs';
import { PackageTrackingDelegate } from 'src/application/delegates';
import { AuthService } from '../utils/services';
import { IUserResponse } from 'src/domain/interfaces';
import { UserId } from '../utils/decorators';
import { ShipmentEntity } from '../persistance';
import { JwtGuard } from '../utils/guards';
import { ValidateMongoId } from '../utils/validators';

@Controller('tracking')
export class AppController {
  private readonly delegator: PackageTrackingDelegate;

  constructor(
    private readonly userService: UserService,
    private readonly shipmentService: ShipmentService,
    private readonly statusService: StatusService,
    private readonly authService: AuthService,
  ) {
    this.delegator = new PackageTrackingDelegate(
      userService,
      shipmentService,
      authService,
    );
  }

  @Post('sign-up')
  signUp(@Body() dto: SignUpDto): Observable<IUserResponse> {
    this.delegator.toSignUp();
    return this.delegator.execute(dto);
  }

  @Post('sign-in')
  signIn(@Body() dto: SignInDto): Observable<IUserResponse> {
    this.delegator.toSignIn();
    return this.delegator.execute(dto);
  }

  @UseGuards(JwtGuard)
  @Get('shipments')
  getShipments(@UserId('id') userId: string): Observable<ShipmentEntity[]> {
    this.delegator.toGetShipmentsByUser();
    return this.delegator.execute(userId);
  }

  @UseGuards(JwtGuard)
  @Get('shipment/:id')
  getShipment(
    @Param('id', ValidateMongoId) shipmentId: string,
    @UserId('id', ValidateMongoId) userId: string,
  ): Observable<ShipmentEntity> {
    this.delegator.toGetShipment();
    return this.delegator.execute(shipmentId, userId);
  }

  @UseGuards(JwtGuard)
  @Post('shipment/create')
  createShipment(
    @Body() dto: RegisterNewShipmentDto,
    @UserId('id', ValidateMongoId) userId: string,
  ): Observable<ShipmentEntity> {
    this.delegator.toRegisterNewShipment();
    return this.delegator.execute(dto, userId);
  }

  @UseGuards(JwtGuard)
  @Patch('user/password-reset')
  requestPassword(
    @Body() dto: ResetPasswordDto,
    @UserId('id', ValidateMongoId) userId: string,
  ) {
    this.delegator.toResetPassword();
    return this.delegator.execute(dto, userId);
  }
}
