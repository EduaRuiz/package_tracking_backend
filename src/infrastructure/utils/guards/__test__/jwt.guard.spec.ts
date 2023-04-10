import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from '..';

describe('JwtGuard', () => {
  let jwtGuard: JwtGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtGuard,
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    jwtGuard = moduleRef.get<JwtGuard>(JwtGuard);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    // Assert
    expect(jwtGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if token is valid', (done) => {
      // Arrange
      const mockToken = 'mockToken';
      const mockDecoded = { id: '1', username: 'user1' };
      jest.spyOn(jwtService, 'verify').mockReturnValue(mockDecoded);
      const mockRequest: any = {
        headers: {
          authorization: `Bearer ${mockToken}`,
        },
      };

      // Act
      const result$ = jwtGuard.canActivate({
        switchToHttp: () => ({ getRequest: () => mockRequest }),
      } as any);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(true);
          expect(jwtService.verify).toHaveBeenCalledWith(mockToken);
          done();
        },
      });
    });

    it('should return false if token is not present in the header', (done) => {
      // Arrange
      const mockRequest: any = {
        headers: {},
      };

      // Act
      const result$ = jwtGuard.canActivate({
        switchToHttp: () => ({ getRequest: () => mockRequest }),
      } as any);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toBe(false);
          done();
        },
      });
    });

    it('should throw an UnauthorizedException if the token is invalid', (done) => {
      // Arrange
      const mockToken = 'mockToken';
      const mockError = new Error('invalid token');
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw mockError;
      });
      const mockRequest: any = {
        headers: {
          authorization: `Bearer ${mockToken}`,
        },
      };

      // Act
      const result$ = jwtGuard.canActivate({
        switchToHttp: () => ({ getRequest: () => mockRequest }),
      } as any);

      // Assert
      result$.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(UnauthorizedException);
          expect(err.message).toBe(mockError.message);
          expect(jwtService.verify).toHaveBeenCalledWith(mockToken);
          done();
        },
      });
    });
  });
});
