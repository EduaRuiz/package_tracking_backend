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

@Injectable()
export class UserMongoService implements IUserDomainService {
  constructor(private readonly userRepository: UserMongoRepository) {}

  updateUser(
    entityId: string,
    entity: UserDomainEntity,
  ): Observable<UserDomainEntity> {
    return this.userRepository.update(entityId, entity);
  }

  deleteUser(entityId: string): Observable<UserDomainEntity> {
    return this.userRepository.delete(entityId);
  }

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

  getUserById(id: string): Observable<UserMongoModel> {
    return this.userRepository.findOneById(id);
  }

  getAllUsers(): Observable<UserMongoModel[]> {
    return this.userRepository.findAll();
  }
}
