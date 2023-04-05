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

@Injectable()
export class UserMongoService implements IUserDomainService {
  constructor(private readonly userRepository: UserMongoRepository) {}

  signIn(email: string, password: string): Observable<UserMongoModel> {
    return this.getAllUsers().pipe(
      map((users: UserMongoModel[]) =>
        users.find((user) => user.email === email),
      ),
      switchMap((user: UserMongoModel) => {
        return !user
          ? throwError(new NotFoundException('User not found'))
          : from(compare(password, user.password)).pipe(
              switchMap((isMatch: boolean) => {
                return !isMatch
                  ? throwError(new BadRequestException('Invalid password'))
                  : of(user);
              }),
            );
      }),
    );
  }

  signUp(entity: UserMongoModel): Observable<UserMongoModel> {
    return from(hash(entity.password, 10)).pipe(
      switchMap((hashedPassword: string) => {
        return this.userRepository.create({
          ...entity,
          password: hashedPassword,
        });
      }),
    );
  }

  resetPassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Observable<UserMongoModel> {
    return this.getUserById(userId).pipe(
      switchMap((user: UserMongoModel) => {
        return from(compare(oldPassword, user.password)).pipe(
          switchMap((isMatch: boolean) => {
            return !isMatch
              ? throwError(new BadRequestException('Invalid password'))
              : of(user).pipe(
                  switchMap((user: UserMongoModel) => {
                    return from(hash(newPassword, 10)).pipe(
                      switchMap((hashedPassword: string) => {
                        user.password = hashedPassword;
                        return this.userRepository.update(user._id, user);
                      }),
                    );
                  }),
                );
          }),
        );
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
