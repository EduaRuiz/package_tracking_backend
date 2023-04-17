import { UserDomainEntity } from '../entities';
import { Observable } from 'rxjs';

/**
 * User Domain Service interface definition with the methods to be implemented
 *
 * @export
 * @interface IUserDomainService
 * @typedef {IUserDomainService}
 * @template Entity
 */
export interface IUserDomainService<
  Entity extends UserDomainEntity = UserDomainEntity,
> {
  /**
   * Sign in user with email and firebase id as password and returns it
   *
   * @param {string} email The email of the user to sign in
   * @param {string} firebase The firebase id of the user to sign in
   * @returns {Observable<Entity>} The signed in user
   */
  signIn(email: string, firebase: string): Observable<Entity>;
  /**
   * Sign up user with all the data and returns it
   *
   * @param {Entity} entity The user to sign up
   * @returns {Observable<Entity>} The signed up user
   */
  signUp(entity: Entity): Observable<Entity>;
  /**
   * Get user by id from the source and returns it
   *
   * @param {string} entityId The id of the user to get
   * @returns {Observable<Entity>} The user with the given id
   */
  getUserById(entityId: string): Observable<Entity>;
  /**
   * Updates user in the source and returns it
   *
   * @param {string} entityId The id of the user to update
   * @param {Entity} entity The user to update
   * @returns {Observable<Entity>} The updated user
   */
  updateUser(entityId: string, entity: Entity): Observable<Entity>;
  /**
   * Deletes user from the source and returns it
   *
   * @param {string} entityId The id of the user to delete
   * @returns {Observable<Entity>} The deleted user
   */
  deleteUser(entityId: string): Observable<Entity>;
  /**
   * Gets all users and returns them
   *
   * @returns {Observable<Entity[]>} All users
   */
  getAllUsers(): Observable<Entity[]>;
}
