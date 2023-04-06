import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MongooseConfigService } from './mongoose-config.service';

describe('MongooseConfigService', () => {
  let service: MongooseConfigService;
  let mockConfigService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    // Arrange
    mockConfigService = {
      get: jest.fn((key: string) => {
        return key === 'MONGO_DB_URI_TRACKING'
          ? 'mongodb://localhost:27017'
          : key === 'MONGO_DB_NAME_TRACKING'
          ? 'Packaging'
          : '';
      }),
    } as unknown as jest.Mocked<ConfigService>;

    const moduleRef = await Test.createTestingModule({
      providers: [
        MongooseConfigService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    // Act
    service = moduleRef.get<MongooseConfigService>(MongooseConfigService);
  });

  it('should create an instance of MongooseConfigService', () => {
    // Assert
    expect(service).toBeInstanceOf(MongooseConfigService);
  });

  it('should return the correct mongoose options', () => {
    // Act
    const options = service.createMongooseOptions();

    // Assert
    expect(options.dbName).toEqual('Packaging');
    expect(options.uri).toEqual('mongodb://localhost:27017');
  });
});
