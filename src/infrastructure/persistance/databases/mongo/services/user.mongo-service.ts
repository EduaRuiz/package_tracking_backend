import { Observable, from, map, of, switchMap, throwError } from 'rxjs';
import { IUserDomainService } from 'src/domain/services';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserMongoRepository } from '../repositories';
import { UserMongoModel } from '../models';
import { UserDomainEntity } from 'src/domain/entities';

/**
 * User Mongo Service class
 *
 * @export
 * @class UserMongoService
 * @typedef {UserMongoService}
 * @implements {IUserDomainService}
 */
@Injectable()
export class UserMongoService implements IUserDomainService {
  /**
   * Creates an instance of UserMongoService.
   *
   * @constructor
   * @param {UserMongoRepository} userRepository The user Mongo repository
   */
  constructor(private readonly userRepository: UserMongoRepository) {}

  /**
   * Updates a user
   *
   * @param {string} entityId The user id to update
   * @param {UserDomainEntity} entity The user to update
   * @returns {Observable<UserDomainEntity>} The user updated
   */
  updateUser(
    entityId: string,
    entity: UserDomainEntity,
  ): Observable<UserDomainEntity> {
    return this.userRepository.update(entityId, entity);
  }

  /**
   * Deletes a user
   *
   * @param {string} entityId The user id to delete
   * @returns {Observable<UserDomainEntity>} The user deleted
   */
  deleteUser(entityId: string): Observable<UserDomainEntity> {
    return this.userRepository.delete(entityId);
  }

  /**
   * Sign in a user
   *
   * @param {string} email The user email
   * @param {string} firebaseId The user firebaseId
   * @returns {Observable<UserMongoModel>} The user signed in
   */
  signIn(email: string, firebaseId: string): Observable<UserMongoModel> {
    return this.getAllUsers().pipe(
      map((users: UserMongoModel[]) =>
        users.find((user) => user.email === email),
      ),
      switchMap((user: UserMongoModel) => {
        return !user
          ? throwError(() => new NotFoundException('User not found'))
          : from(compare(firebaseId, user.firebaseId)).pipe(
              switchMap((isMatch: boolean) => {
                return !isMatch
                  ? throwError(
                      () => new BadRequestException('Invalid firebaseId'),
                    )
                  : of(user);
              }),
            );
      }),
    );
  }

  /**
   * Sign up a user
   *
   * @param {UserMongoModel} entity The user to sign up
   * @returns {Observable<UserMongoModel>} The user signed up
   */
  signUp(entity: UserMongoModel): Observable<UserMongoModel> {
    return from(hash(entity.firebaseId, 10)).pipe(
      switchMap((hashedPassword: string) => {
        return this.userRepository.create({
          ...entity,
          firebaseId: hashedPassword,
        });
      }),
    );
  }

  /**
   * Gets a user by id
   *
   * @param {string} id The user id to get
   * @returns {Observable<UserMongoModel>} The user found
   */
  getUserById(id: string): Observable<UserMongoModel> {
    return this.userRepository.findOneById(id);
  }

  /**
   * Gets all users
   *
   * @returns {Observable<UserMongoModel[]>} The users found
   */
  getAllUsers(): Observable<UserMongoModel[]> {
    return this.userRepository.findAll();
  }
}
