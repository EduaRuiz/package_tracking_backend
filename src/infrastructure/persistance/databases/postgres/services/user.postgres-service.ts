import { Observable, from, map, of, switchMap, throwError } from 'rxjs';
import { IUserDomainService } from 'src/domain/services';
import { UserPostgresRepository } from '../repositories';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserPostgresEntity } from '../entities';

@Injectable()
export class UserPostgresService implements IUserDomainService {
  constructor(private readonly userRepository: UserPostgresRepository) {}

  signIn(email: string, password: string): Observable<UserPostgresEntity> {
    return this.getAllUsers().pipe(
      map((users: UserPostgresEntity[]) =>
        users.find((user) => user.email === email),
      ),
      switchMap((user: UserPostgresEntity) => {
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

  signUp(entity: UserPostgresEntity): Observable<UserPostgresEntity> {
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
  ): Observable<UserPostgresEntity> {
    return this.getUserById(userId).pipe(
      switchMap((user: UserPostgresEntity) => {
        return from(compare(oldPassword, user.password)).pipe(
          switchMap((isMatch: boolean) => {
            return !isMatch
              ? throwError(new BadRequestException('Invalid password'))
              : of(user).pipe(
                  switchMap((user: UserPostgresEntity) => {
                    return from(hash(newPassword, 10)).pipe(
                      switchMap((hashedPassword: string) => {
                        user.password = hashedPassword;
                        return this.userRepository.update(user.id, user);
                      }),
                    );
                  }),
                );
          }),
        );
      }),
    );
  }

  getUserById(id: string): Observable<UserPostgresEntity> {
    return this.userRepository.findOneById(id);
  }

  getAllUsers(): Observable<UserPostgresEntity[]> {
    return this.userRepository.findAll();
  }
}
