import { IShipmentDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { of } from 'rxjs';
import { GetShipmentsByUserUseCase } from '..';

let getShipmentsByUserUseCase: IUseCase;
let shipmentDomainService: IShipmentDomainService;

describe('GetShipmentsByUserUseCase', () => {
  // Arrange
  beforeEach(() => {
    shipmentDomainService = {
      getAllShipments: jest
        .fn()
        .mockReturnValue(
          of([
            { id: '1234', user: { _id: '5678' } } as any,
            { id: '5678', user: { _id: '9999' } } as any,
            { id: '91011', user: { _id: '5678' } } as any,
          ]),
        ),
    } as unknown as IShipmentDomainService;

    // Act
    getShipmentsByUserUseCase = new GetShipmentsByUserUseCase(
      shipmentDomainService,
    );
  });

  it('should be defined', () => {
    // Assert
    expect(getShipmentsByUserUseCase).toBeDefined();
  });

  it('should filter shipments by user successfully', (done) => {
    // Arrange
    const userId = '5678';

    // Act
    const result$ = getShipmentsByUserUseCase.execute(userId);

    // Assert
    result$.subscribe((result) => {
      expect(result).toEqual([
        { id: '1234', user: { _id: '5678' } },
        { id: '91011', user: { _id: '5678' } },
      ]);
      done();
    });
  });

  it('should return empty array when user has no shipments', (done) => {
    // Arrange
    const userId = '1111';

    // Act
    const result$ = getShipmentsByUserUseCase.execute(userId);

    // Assert
    result$.subscribe((result) => {
      expect(result).toEqual([]);
      done();
    });
  });
});
