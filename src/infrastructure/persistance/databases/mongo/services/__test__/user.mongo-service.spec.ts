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
            delete: jest.fn(),
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

  describe('getUserById', () => {
    it('should return a user when user is found', (done) => {
      // Arrange
      const user: UserMongoModel = {} as unknown as UserMongoModel;
      jest.spyOn(repository, 'findOneById').mockReturnValue(of(user));

      // Act
      const result$ = service.getUserById('1');

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(user);
          done();
        },
      });
    });

    it('should throw NotFoundException when user is not found', (done) => {
      // Arrange
      const message = 'User not found';
      jest
        .spyOn(repository, 'findOneById')
        .mockReturnValue(throwError(() => new NotFoundException(message)));

      // Act
      const result$ = service.getUserById('1');

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toBe(message);
          done();
        },
      });
    });
  });

  describe('signIn', () => {
    const email = 'test@test.com';
    const firebaseId = 'vZcewrdlV72DHVWORTEa';
    const hashedFirebaseId =
      '$2a$10$zcya2vOf9boqWXGsS8IbSOQRachOsyiPz33eMm7gSKrtep8U10lvO';

    it('should return a user when email and firebaseId match', (done) => {
      // Arrange
      const user: UserMongoModel = {
        _id: '1',
        email: email,
        firebaseId: hashedFirebaseId,
      } as unknown as UserMongoModel;
      jest.spyOn(repository, 'findAll').mockReturnValue(of([user]));

      // Act
      const result$ = service.signIn(email, firebaseId);

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

      service.signIn(email, firebaseId).subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toBe('User not found');
          done();
        },
      });
    });

    it('should throw BadRequestException when firebaseId is invalid', (done) => {
      const user: UserMongoModel = {
        _id: '1',
        email: email,
        firebaseId: hashedFirebaseId,
      } as unknown as UserMongoModel;
      jest.spyOn(repository, 'findAll').mockReturnValue(of([user]));

      service.signIn(email, 'wrong-firebaseId').subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.message).toBe('Invalid firebaseId');
          done();
        },
      });
    });

    it('should return an Observable throwing an error when repository.findAll() fails', (done) => {
      jest
        .spyOn(repository, 'findAll')
        .mockReturnValue(throwError(() => new Error()));

      service.signIn(email, firebaseId).subscribe({
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
      firebaseId: 'firebaseId',
    } as unknown as UserMongoModel;
    const hashedFirebaseId =
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

  describe('delete', () => {
    it('should return a user', (done) => {
      // Arrange
      const user: UserMongoModel = {
        _id: '1',
        email: 'email',
        firebaseId: 'firebaseId',
      } as unknown as UserMongoModel;
      jest.spyOn(repository, 'delete').mockReturnValue(of(user));

      // Act
      const result$ = service.deleteUser(user._id);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(user);
          done();
        },
      });
    });
  });

  describe('update', () => {
    it('should return a user', (done) => {
      // Arrange
      const user: UserMongoModel = {
        _id: '1',
        email: 'email',
        firebaseId: 'firebaseId',
      } as unknown as UserMongoModel;
      jest.spyOn(repository, 'update').mockReturnValue(of(user));

      // Act
      const result$ = service.updateUser(user._id, user);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(user);
          done();
        },
      });
    });
  });
});
