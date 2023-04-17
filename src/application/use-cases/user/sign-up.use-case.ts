import { IAuthDomainService, IUserDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { ISignUpDto } from 'src/domain/dto';
import { UserDomainEntity } from 'src/domain/entities';
import { IUserResponse } from 'src/domain/interfaces';
import { ConflictException } from '@nestjs/common';

/**
 * Sign up use case class definition for sign up user
 *
 * @export
 * @class SignUpUseCase
 * @typedef {SignUpUseCase}
 * @implements {IUseCase}
 */
export class SignUpUseCase implements IUseCase {
  /**
   * Creates an instance of SignUpUseCase.
   *
   * @constructor
   * @param {IUserDomainService} user$ User domain service
   * @param {IAuthDomainService} auth$ Auth domain service
   */
  constructor(
    private readonly user$: IUserDomainService,
    private readonly auth$: IAuthDomainService,
  ) {}

  /**
   * Sign up user by dto
   *
   * @param {ISignUpDto} dto Sign up dto
   * @returns {Observable<IUserResponse>} User response observable
   */
  execute(dto: ISignUpDto): Observable<IUserResponse> {
    return this.validateUserDataExist(dto).pipe(
      switchMap(() =>
        this.user$
          .signUp(dto)
          .pipe(
            switchMap((user: UserDomainEntity) =>
              this.auth$.generateAuthResponse(user),
            ),
          ),
      ),
    );
  }

  /**
   * Validate user data exist
   *
   * @private
   * @param {ISignUpDto} dto Sign up dto
   * @returns {Observable<boolean>} Boolean observable
   */
  private validateUserDataExist(dto: ISignUpDto): Observable<boolean> {
    return this.user$.getAllUsers().pipe(
      switchMap((users: UserDomainEntity[]) => {
        const user = users.filter((user: UserDomainEntity) => {
          return (
            dto.email.toString() === user.email.toString() ||
            dto.document.toString() === user.document.toString() ||
            dto.firebaseId === user.firebaseId
          );
        })[0];
        return !user
          ? of(false)
          : user.email === dto.email
          ? throwError(() => new ConflictException('Email already exist'))
          : dto.firebaseId === user.firebaseId
          ? throwError(() => new ConflictException('FirebaseId already exist'))
          : throwError(() => new ConflictException('Document already exist'));
      }),
    );
  }
}
