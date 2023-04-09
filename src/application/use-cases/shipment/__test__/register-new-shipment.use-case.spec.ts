import {
  IShipmentDomainService,
  IUserDomainService,
} from 'src/domain/services';
import { of, throwError } from 'rxjs';
import { RegisterNewShipmentUseCase } from '..';
import { NotFoundException } from '@nestjs/common';
import { shipment, user, registerNewShipmentDto } from './mocks';
import { IUseCase } from '../../interface';

let registerNewShipmentUseCase: IUseCase;
let shipmentDomainService: IShipmentDomainService;
let userDomainService: IUserDomainService;

describe('RegisterNewShipmentUseCase', () => {
  beforeEach(() => {
    shipmentDomainService = {
      createShipment: jest.fn().mockReturnValue(of(shipment)),
    } as unknown as IShipmentDomainService;
    userDomainService = {
      getUserById: jest.fn().mockReturnValue(of(user)),
    } as unknown as IUserDomainService;
    registerNewShipmentUseCase = new RegisterNewShipmentUseCase(
      shipmentDomainService,
      userDomainService,
    );
  });

  it('should be defined', () => {
    // Assert
    expect(registerNewShipmentUseCase).toBeDefined();
  });

  it('should create shipment successfully', (done) => {
    // Arrange
    const dto = registerNewShipmentDto;
    const userId = user._id;

    // Act
    const result$ = registerNewShipmentUseCase.execute(dto, userId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toEqual(shipment);
        done();
      },
    });
  });

  it('should throw NotFoundException when userId is not same', (done) => {
    // Arrange
    const dto = registerNewShipmentDto;
    const userId = '9999';

    // Act
    const result$ = registerNewShipmentUseCase.execute(dto, userId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('User not found');
        done();
      },
    });
  });

  it('should throw NotFoundException when dto.userId is different from userId', (done) => {
    // Arrange
    const dto = registerNewShipmentDto;
    const userId = '9999';

    // Act
    const result$ = registerNewShipmentUseCase.execute(dto, userId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('User not found');
        done();
      },
    });
  });

  it('should throw NotFoundException when user does not exist', (done) => {
    // Arrange
    const dto = registerNewShipmentDto;
    const userId = dto.userId;

    jest
      .spyOn(userDomainService, 'getUserById')
      .mockReturnValue(
        throwError(() => new NotFoundException('User not found')),
      );

    // Act
    const result$ = registerNewShipmentUseCase.execute(dto, userId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('User not found');
        done();
      },
    });
  });

  it('should throw NotFoundException when user._id is different from userId', (done) => {
    // Arrange
    const dto = registerNewShipmentDto;
    const userId = dto.userId;

    jest
      .spyOn(userDomainService, 'getUserById')
      .mockReturnValue(of({ ...user, _id: '9999' }));

    // Act
    const result$ = registerNewShipmentUseCase.execute(dto, userId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('User not found');
        done();
      },
    });
  });
});
