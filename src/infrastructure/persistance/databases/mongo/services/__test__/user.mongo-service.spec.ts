import { IUserDomainService } from 'src/domain/services';
import { UserMongoRepository } from '../../repositories';
import { Test, TestingModule } from '@nestjs/testing';
import { UserMongoService } from '..';
import { UserMongoModel } from '../../models';
import { of, throwError } from 'rxjs';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UserMongoService', () => {
  let service: IUserDomainService;
  let repository: UserMongoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserMongoService,
        {
          provide: UserMongoRepository,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findOneById: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IUserDomainService>(UserMongoService);
    repository = module.get<UserMongoRepository>(UserMongoRepository);
  });

  it('should be defined', () => {
    // Assert
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    const email = 'test@test.com';
    const password = 'Password';
    const hashedPassword =
      '$2a$10$4RqipeZz4vz5RWAWmQFD9u81Ytak8kR73yejV6gQ4gnTV4qA1oide';

    it('should return a user when email and password match', (done) => {
      // Arrange
      const user: UserMongoModel = {
        _id: '1',
        email: email,
        password: hashedPassword,
      } as unknown as UserMongoModel;
      jest.spyOn(repository, 'findAll').mockReturnValue(of([user]));

      // Act
      const result$ = service.signIn(email, password);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(user);
          done();
        },
      });
    });

    it('should throw NotFoundException when email is not found', (done) => {
      jest.spyOn(repository, 'findAll').mockReturnValue(of([]));

      service.signIn(email, password).subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toBe('User not found');
          done();
        },
      });
    });

    it('should throw BadRequestException when password is invalid', (done) => {
      const user: UserMongoModel = {
        _id: '1',
        email: email,
        password: hashedPassword,
      } as unknown as UserMongoModel;
      jest.spyOn(repository, 'findAll').mockReturnValue(of([user]));

      service.signIn(email, 'wrong-password').subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.message).toBe('Invalid password');
          done();
        },
      });
    });

    it('should return an Observable throwing an error when repository.findAll() fails', (done) => {
      jest
        .spyOn(repository, 'findAll')
        .mockReturnValue(throwError(new Error()));

      service.signIn(email, password).subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          done();
        },
      });
    });
  });

  describe('signUp', () => {
    const user: UserMongoModel = {
      _id: '1',
      email: 'test@test.com',
      password: 'password',
    } as unknown as UserMongoModel;
    const hashedPassword =
      '$2a$10$4RqipeZz4vz5RWAWmQFD9u81Ytak8kR73yejV6gQ4gnTV4qA1oide';

    it('should return a user when email is not found', (done) => {
      jest.spyOn(repository, 'findAll').mockReturnValue(of([]));
      jest.spyOn(repository, 'create').mockReturnValue(of(user));

      service.signUp(user).subscribe((result) => {
        expect(result).toEqual(user);
        done();
      });
    });
  });

  describe('resetPassword', () => {
    let oldPassword = 'oldPassword';
    const newPassword = 'newPassword';
    const user: UserMongoModel = {
      _id: '1',
      email: 'mail.com',
      password: '$2a$10$48ufItLfsD5uXI.2RNeYbuWkFwZW8U0XXxVaq8bJyOY7v2DQHI7rC',
    } as unknown as UserMongoModel;

    it('should return a user', (done) => {
      // Arrange
      jest.spyOn(repository, 'findOneById').mockReturnValue(of(user));
      jest.spyOn(repository, 'update').mockReturnValue(of(user));

      // Act
      const result$ = service.resetPassword(user._id, oldPassword, newPassword);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(user);
          done();
        },
      });
    });

    it('should throw BadRequestException when password is invalid', (done) => {
      // Arrange
      oldPassword = 'wrongPassword';
      const message = 'Invalid password';
      jest.spyOn(repository, 'findOneById').mockReturnValue(of(user));

      // Act
      const result$ = service.resetPassword(user._id, oldPassword, newPassword);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.message).toBe(message);
          done();
        },
      });
    });
  });
});
