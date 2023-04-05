import { UserDomainEntity } from '../entities';
import { Observable } from 'rxjs';

export interface IUserDomainService<
  Entity extends UserDomainEntity = UserDomainEntity,
> {
  signIn(email: string, password: string): Observable<Entity>;
  signUp(entity: Entity): Observable<Entity>;
  resetPassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Observable<Entity>;
  getUserById(entityId: string): Observable<Entity>;
  getAllUsers(): Observable<Entity[]>;
}
