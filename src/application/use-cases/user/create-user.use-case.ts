import { IUserDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { Observable } from 'rxjs';
import { UserDomainEntity } from 'src/domain/entities';
import { ISignUpDto } from 'src/domain/dto';

/**
 * Create user use case
 *
 * @export
 * @class CreateUserUseCase
 * @typedef {CreateUserUseCase}
 * @implements {IUseCase}
 */
export class CreateUserUseCase implements IUseCase {
  /**
   * Creates an instance of CreateUserUseCase.
   *
   * @constructor
   * @param {IUserDomainService} user$ User domain service
   */
  constructor(private readonly user$: IUserDomainService) {}

  /**
   * Create user by dto and id of user
   *
   * @param {ISignUpDto} dto Sign up dto
   * @returns {Observable<UserDomainEntity>} User domain entity observable
   */
  execute(dto: ISignUpDto): Observable<UserDomainEntity> {
    return this.user$.signUp(dto);
  }
}
