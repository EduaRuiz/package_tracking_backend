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
import {
  ShipmentService,
  StatusService,
  UserService,
} from '../persistance/services';
import {
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  UpdateUserDto,
} from '../utils/dto';
import { Observable } from 'rxjs';
import { AuthService } from '../utils/services';
import { IUserResponse } from 'src/domain/interfaces';
import { JwtGuard } from '../utils/guards';
import { ValidateMongoId } from '../utils/validators';
import UserId from '../utils/decorators/user-id.decorator';
import { UserEntity } from '../persistance';
import { PackageTrackingDelegate } from '@application/delegates';

@Controller('user')
export class UserController {
  private readonly delegator: PackageTrackingDelegate;

  constructor(
    private readonly user$: UserService,
    private readonly shipment$: ShipmentService,
    private readonly status$: StatusService,
    private readonly auth$: AuthService,
  ) {
    this.delegator = new PackageTrackingDelegate(
      this.user$,
      this.shipment$,
      this.status$,
      this.auth$,
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
  @Patch('password-reset')
  resetPassword(
    @Body() dto: ResetPasswordDto,
    @UserId('id', ValidateMongoId) userId: string,
  ) {
    this.delegator.toResetPassword();
    return this.delegator.execute(dto, userId);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getUser(
    @Param('id', ValidateMongoId) userId: string,
  ): Observable<UserEntity> {
    this.delegator.toGetUser();
    return this.delegator.execute(userId);
  }

  @UseGuards(JwtGuard)
  @Post('create')
  createUser(@Body() dto: SignUpDto): Observable<UserEntity> {
    this.delegator.toCreateUser();
    return this.delegator.execute(dto);
  }

  @UseGuards(JwtGuard)
  @Patch('update')
  updateUser(
    @Body() dto: UpdateUserDto,
    @UserId('id', ValidateMongoId) userId: string,
  ): Observable<UserEntity> {
    this.delegator.toUpdateUser();
    return this.delegator.execute(dto, userId);
  }

  @UseGuards(JwtGuard)
  @Delete('delete')
  deleteUser(
    @UserId('id', ValidateMongoId) userId: string,
  ): Observable<UserEntity> {
    this.delegator.toDeleteUser();
    return this.delegator.execute(userId);
  }
}
