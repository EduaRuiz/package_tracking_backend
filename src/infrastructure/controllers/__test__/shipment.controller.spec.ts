import { ShipmentController } from '..';
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
import { registerNewShipmentDto, shipment, user } from './mocks';
// import { PackageTrackingDelegate } from '@application/delegates';

describe('ShipmentController', () => {
  let controller: ShipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipmentController],
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

    controller = module.get<ShipmentController>(ShipmentController);
  });

  it('should be defined', () => {
    // Assert
    expect(controller).toBeDefined();
  });

  describe('getShipments', () => {
    it('should call the delegator to get all shipments', (done) => {
      // Arrange
      const expected = [shipment];
      const userId = expected[0].user._id;
      const spy = jest.spyOn(
        PackageTrackingDelegate.prototype,
        'toGetShipmentsByUser',
      );
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of([shipment]));

      // Act
      const result$ = controller.getShipments(userId);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should throw an error if user does not exist', (done) => {
      // Arrange
      const expected = new Error('User does not exist');
      const userId = 'userId';
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => expected));

      // Act
      const result$ = controller.getShipments(userId);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toEqual(expected);
          done();
        },
      });
    });
  });

  describe('getShipment', () => {
    it('should call the delegator to get a shipment by id', (done) => {
      // Arrange
      const expected = shipment;
      const shipmentId = expected._id;
      const userId = expected.user._id;
      const spy = jest.spyOn(
        PackageTrackingDelegate.prototype,
        'toGetShipment',
      );
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(shipment));

      // Act
      const result$ = controller.getShipment(shipmentId, userId);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should throw an error if shipment does not exist', (done) => {
      // Arrange
      const expected = new Error('Shipment does not exist');
      const shipmentId = 'shipmentId';
      const userId = 'userId';
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => expected));

      // Act
      const result$ = controller.getShipment(shipmentId, userId);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toEqual(expected);
          done();
        },
      });
    });
  });

  describe('createShipment', () => {
    it('should call the delegator to register a new shipment', (done) => {
      // Arrange
      const expected = shipment;
      const dto = registerNewShipmentDto;
      const userId = dto.userId;
      const spy = jest.spyOn(
        PackageTrackingDelegate.prototype,
        'toRegisterNewShipment',
      );
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(shipment));

      // Act
      const result$ = controller.createShipment(dto, userId);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should throw an error if user does not exist', (done) => {
      // Arrange
      const expected = new Error('User does not exist');
      const dto = registerNewShipmentDto;
      const userId = dto.userId;
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => expected));

      // Act
      const result$ = controller.createShipment(dto, userId);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toEqual(expected);
          done();
        },
      });
    });
  });

  describe('updateShipment', () => {
    it('should call the delegator to update a shipment', (done) => {
      // Arrange
      const expected = shipment;
      const dto = registerNewShipmentDto;
      const shipmentId = expected._id;
      const spy = jest.spyOn(
        PackageTrackingDelegate.prototype,
        'toUpdateShipment',
      );
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(shipment));

      // Act
      const result$ = controller.updateShipment(shipmentId, dto);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should throw an error if shipment does not exist', (done) => {
      // Arrange
      const expected = new Error('Shipment does not exist');
      const dto = registerNewShipmentDto;
      const shipmentId = 'shipmentId';
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => expected));

      // Act
      const result$ = controller.updateShipment(shipmentId, dto);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toEqual(expected);
          done();
        },
      });
    });
  });

  describe('deleteShipment', () => {
    it('should call the delegator to delete a shipment', (done) => {
      // Arrange
      const expected = shipment;
      const shipmentId = expected._id;
      const userId = expected.user._id;
      const spy = jest.spyOn(
        PackageTrackingDelegate.prototype,
        'toDeleteShipment',
      );
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(shipment));

      // Act
      const result$ = controller.deleteShipment(shipmentId, userId);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should throw an error if shipment does not exist', (done) => {
      // Arrange
      const expected = new Error('Shipment does not exist');
      const shipmentId = 'shipmentId';
      const userId = 'userId';
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => expected));

      // Act
      const result$ = controller.deleteShipment(shipmentId, userId);

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
