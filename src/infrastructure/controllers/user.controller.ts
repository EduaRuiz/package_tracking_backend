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
import { SignInDto, SignUpDto, UpdateUserDto } from '../utils/dto';
import { Observable } from 'rxjs';
import { AuthService } from '../utils/services';
import { IUserResponse } from 'src/domain/interfaces';
import { JwtGuard } from '../utils/guards';
import { ValidateMongoId } from '../utils/validators';
import UserId from '../utils/decorators/user-id.decorator';
import { UserEntity } from '../persistance';
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
  UnauthorizedSwagger,
  UserSwaggerEntity,
} from '@infrastructure/utils/swagger-types';

/**
 * User controller class that handles all the user related endpoints of the API and delegates
 * the logic to the PackageTrackingDelegate class
 *
 * @export
 * @class UserController
 * @typedef {UserController}
 */
@ApiTags('User API')
@Controller('user')
export class UserController {
  /**
   * PackageTrackingDelegate instance that handles the logic of the user endpoints of the API
   *
   * @private
   * @readonly
   * @type {PackageTrackingDelegate}
   */
  private readonly delegator: PackageTrackingDelegate;

  /**
   * Creates an instance of UserController.
   *
   * @constructor
   * @param {UserService} user$ UserService instance
   * @param {ShipmentService} shipment$ ShipmentService instance
   * @param {StatusService} status$ StatusService instance
   * @param {AuthService} auth$ AuthService instance
   */
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

  /**
   * Sign up a new user
   *
   * @param {SignUpDto} dto User data
   * @returns {Observable<IUserResponse>} Observable that emits the user data
   */
  @Post('sign-up')
  @ApiOperation({
    summary:
      'Return a status by its id. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description:
      'Status consult failed. Please check the shipment id and try again',
    type: UserSwaggerEntity,
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
  signUp(@Body() dto: SignUpDto): Observable<IUserResponse> {
    this.delegator.toSignUp();
    return this.delegator.execute(dto);
  }

  /**
   * Sign in a user
   *
   * @param {SignInDto} dto User data to sign in
   * @returns {Observable<IUserResponse>} Observable that emits the user data
   */
  @Post('sign-in')
  @ApiOperation({
    summary: 'Sign in a user. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description:
      'Sign in a user successfully. This endpoint is only for testing purposes',
    type: UserSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Sign in a user failed. Please check the shipment id and try again',
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
  signIn(@Body() dto: SignInDto): Observable<IUserResponse> {
    this.delegator.toSignIn();
    return this.delegator.execute(dto);
  }

  /**
   * Get user by its id
   *
   * @param {string} userId User id
   * @param {string} currentUserId Current user id from token
   * @returns {Observable<UserEntity>}
   */
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Get a user by its id. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description:
      'Get a user by its id successfully. This endpoint is only for testing purposes',
    type: UserSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Get a user by its id failed. Please check the shipment id and try again',
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
  @Get(':id')
  getUser(
    @Param('id', ValidateMongoId) userId: string,
    @UserId('id', ValidateMongoId) currentUserId: string,
  ): Observable<UserEntity> {
    this.delegator.toGetUser();
    return this.delegator.execute(userId, currentUserId);
  }

  /**
   * Create a user
   *
   * @param {SignUpDto} dto User data to create
   * @returns {Observable<UserEntity>} Observable that emits the user data
   */
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Create a user. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description:
      'Create a user successfully. This endpoint is only for testing purposes',
    type: UserSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Create a user failed. Please check the shipment id and try again',
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
  @Post('create')
  createUser(@Body() dto: SignUpDto): Observable<UserEntity> {
    this.delegator.toCreateUser();
    return this.delegator.execute(dto);
  }

  /**
   * Update a user
   *
   * @param {UpdateUserDto} dto User data to update
   * @param {string} userId User id to update
   * @returns {Observable<UserEntity>} Observable that emits the user data
   */
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Update a user. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description:
      'Update a user successfully. This endpoint is only for testing purposes',
    type: UserSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Update a user failed. Please check the shipment id and try again',
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
  @Patch('update')
  updateUser(
    @Body() dto: UpdateUserDto,
    @UserId('id', ValidateMongoId) userId: string,
  ): Observable<UserEntity> {
    this.delegator.toUpdateUser();
    return this.delegator.execute(dto, userId);
  }

  /**
   * Delete a user
   *
   * @param {string} userId User id to delete
   * @param {string} currentUserId Current user id from token
   * @returns {Observable<UserEntity>} Observable that emits the user data
   */
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Delete a user. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description:
      'Delete a user successfully. This endpoint is only for testing purposes',
    type: UserSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Delete a user failed. Please check the shipment id and try again',
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
  @Delete('delete/:id')
  deleteUser(
    @Param('id', ValidateMongoId) userId: string,
    @UserId('id', ValidateMongoId) currentUserId: string,
  ): Observable<UserEntity> {
    this.delegator.toDeleteUser();
    return this.delegator.execute(userId, currentUserId);
  }

  /**
   * Refresh token
   *
   * @param {string} userId User id to refresh token
   * @returns {Observable<IUserResponse>} Observable that emits the user data
   */
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Refresh token. This endpoint is only for testing purposes',
  })
  @ApiResponse({
    status: 200,
    description:
      'Refresh token successfully. This endpoint is only for testing purposes',
    type: UserSwaggerEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'Refresh token failed. Please check the shipment id and try again',
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
  @Get('token/refresh')
  refreshToken(
    @UserId('id', ValidateMongoId) userId: string,
  ): Observable<IUserResponse> {
    this.delegator.toRefreshToken();
    return this.delegator.execute(userId);
  }
}
