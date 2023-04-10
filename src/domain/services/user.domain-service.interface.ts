import { UserDomainEntity } from '../entities';
import { Observable } from 'rxjs';

export interface IUserDomainService<
  Entity extends UserDomainEntity = UserDomainEntity,
> {
  signIn(email: string, firebase: string): Observable<Entity>;
  signUp(entity: Entity): Observable<Entity>;
  getUserById(entityId: string): Observable<Entity>;
  updateUser(entityId: string, entity: Entity): Observable<Entity>;
  deleteUser(entityId: string): Observable<Entity>;
  getAllUsers(): Observable<Entity[]>;
}
