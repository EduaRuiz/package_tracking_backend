import { IUserDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { UserDomainEntity } from 'src/domain/entities';
import { Observable, map, throwError } from 'rxjs';
import { BadRequestException } from '@nestjs/common';

/**
 * Get User Use Case, it implements the IUseCase interface
 *
 * @export
 * @class GetUserUseCase
 * @typedef {GetUserUseCase}
 * @implements {IUseCase}
 */
export class GetUserUseCase implements IUseCase {
  /**
   * Creates an instance of GetUserUseCase.
   *
   * @constructor
   * @param {IUserDomainService} user$ The user domain service
   */
  constructor(private readonly user$: IUserDomainService) {}

  /**
   * Executes the use case and returns the user with the given id
   *
   * @param {string} userId The id of the user to get
   * @param {string} currentUserId The id of the current user
   * @returns {Observable<UserDomainEntity>}
   */
  execute(userId: string, currentUserId: string): Observable<UserDomainEntity> {
    return userId === currentUserId
      ? this.user$.getUserById(userId).pipe(
          map((user: UserDomainEntity) => {
            user.firebaseId = undefined;
            return user;
          }),
        )
      : throwError(() => new BadRequestException('Cannot get other user'));
  }
}
