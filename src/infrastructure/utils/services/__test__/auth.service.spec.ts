import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { IUserDomainEntity } from 'src/domain/entities';
import { IUserResponse } from 'src/domain/interfaces';
import { AuthService } from '..';
import { user } from '../../../../application/use-cases/__test__/mocks';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mockToken'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateAuthResponse', () => {
    const userMock: IUserDomainEntity = {
      _id: 'mockId',
      email: 'mockEmail',
      name: 'mockName',
    } as unknown as IUserDomainEntity;

    it('should return an Observable of IUserResponse', (done) => {
      // Arrange
      const expectedResponse: IUserResponse = {
        data: { _id: 'mockId', email: 'mockEmail', name: 'mockName' },
        token: 'mockToken',
      };
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('mockToken');
      // Act
      const result$ = service.generateAuthResponse(userMock);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expectedResponse);
          done();
        },
      });
    });

    it('should call jwtService sign method with user._id', (done) => {
      // Arrange
      const expectedResponse = {
        data: { _id: 'mockId', email: 'mockEmail', name: 'mockName' },
        token: 'mockToken',
      };
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('mockToken');

      // Act
      const result$ = service.generateAuthResponse(userMock);

      // Assert
      expect(jwtService.sign).toHaveBeenCalledWith({ id: 'mockId' });
      result$.subscribe({
        next: (result) => {
          expect(jwtService.sign).toHaveBeenCalledWith({ id: 'mockId' });
          expect(result).toEqual(expectedResponse);
          expect(result.data._id).toEqual(userMock._id);
          done();
        },
      });
    });
  });
});
