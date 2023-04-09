import { StatusController } from '..';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ShipmentService,
  StatusService,
  UserService,
} from '@infrastructure/persistance/services';
import { AuthService } from '@infrastructure/utils/services';
import { JwtService } from '@nestjs/jwt';
import { PackageTrackingDelegate } from '@application/delegates';
import { of, throwError } from 'rxjs';
import { newStatusDto, status } from './mocks';
// import { PackageTrackingDelegate } from '@application/delegates';

describe('StatusController', () => {
  let controller: StatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        {
          provide: ShipmentService,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: StatusService,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<StatusController>(StatusController);
  });

  it('should be defined', () => {
    // Assert
    expect(controller).toBeDefined();
  });

  describe(' getStatus', () => {
    it('should call the delegator to get a status by id', (done) => {
      // Arrange
      const expected = status;
      const statusId = expected._id;
      const spy = jest.spyOn(PackageTrackingDelegate.prototype, 'toGetStatus');
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(status));

      // Act
      const result$ = controller.getStatus(statusId);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should throw an error if status does not exist', (done) => {
      // Arrange
      const expected = new Error('Shipment does not exist');
      const statusId = 'statusId';
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => expected));

      // Act
      const result$ = controller.getStatus(statusId);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toEqual(expected);
          done();
        },
      });
    });
  });

  describe('createStatus', () => {
    it('should call the delegator to register a new status', (done) => {
      // Arrange
      const expected = status;
      const dto = newStatusDto;
      const spy = jest.spyOn(
        PackageTrackingDelegate.prototype,
        'toRegisterNewStatus',
      );
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(status));

      // Act
      const result$ = controller.createStatus(dto);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should throw an error if there is an error', (done) => {
      // Arrange
      const expected = new Error('Could not register new status');
      const dto = newStatusDto;
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => expected));

      // Act
      const result$ = controller.createStatus(dto);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toEqual(expected);
          done();
        },
      });
    });
  });

  describe('updateStatus', () => {
    it('should call the delegator to update a status', (done) => {
      // Arrange
      const expected = status;
      const dto = newStatusDto;
      const statusId = expected._id;
      const spy = jest.spyOn(
        PackageTrackingDelegate.prototype,
        'toUpdateStatus',
      );
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(status));

      // Act
      const result$ = controller.updateStatus(statusId, dto);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should throw an error if status does not exist', (done) => {
      // Arrange
      const expected = new Error('Status does not exist');
      const dto = newStatusDto;
      const statusId = 'statusId';
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => expected));

      // Act
      const result$ = controller.updateStatus(statusId, dto);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toEqual(expected);
          done();
        },
      });
    });
  });

  describe('deleteStatus', () => {
    it('should call the delegator to delete a status', (done) => {
      // Arrange
      const expected = status;
      const statusId = expected._id;
      const spy = jest.spyOn(
        PackageTrackingDelegate.prototype,
        'toDeleteStatus',
      );
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(status));

      // Act
      const result$ = controller.deleteStatus(statusId);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should throw an error if status does not exist', (done) => {
      // Arrange
      const expected = new Error('Status does not exist');
      const statusId = 'statusId';
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => expected));

      // Act
      const result$ = controller.deleteStatus(statusId);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toEqual(expected);
          done();
        },
      });
    });
  });
});
