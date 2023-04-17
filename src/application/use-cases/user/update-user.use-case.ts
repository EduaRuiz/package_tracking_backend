import { IUserDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { UserDomainEntity } from 'src/domain/entities';
import { Observable, switchMap } from 'rxjs';
import { IUpdateUserDto } from 'src/domain/dto';

/**
 * Update user use case
 *
 * @export
 * @class UpdateUserUseCase
 * @typedef {UpdateUserUseCase}
 * @implements {IUseCase}
 */
export class UpdateUserUseCase implements IUseCase {
  /**
   * Creates an instance of UpdateUserUseCase.
   *
   * @constructor
   * @param {IUserDomainService} user$ User domain service
   */
  constructor(private readonly user$: IUserDomainService) {}

  /**
   * Delete user by id
   *
   * @param {IUpdateUserDto} dto Update user dto
   * @param {string} userId User id
   * @returns {Observable<UserDomainEntity>} User domain entity observable
   */
  execute(dto: IUpdateUserDto, userId: string): Observable<UserDomainEntity> {
    return this.user$.getUserById(userId).pipe(
      switchMap((user) => {
        user.document = dto.document || user.document;
        user.phone = dto.phone || user.phone;
        return this.user$.updateUser(userId, {
          ...user,
          ...dto,
          _id: user._id,
        });
      }),
    );
  }
}
