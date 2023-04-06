import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { StatusMongoService } from '..';
import { StatusMongoRepository } from '../../repositories';
import { StatusMongoModel } from '../../models';

describe('StatusMongoService', () => {
  let service: StatusMongoService;
  let repository: StatusMongoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusMongoService,
        {
          provide: StatusMongoRepository,
          useValue: {
            create: jest.fn(),
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StatusMongoService>(StatusMongoService);
    repository = module.get<StatusMongoRepository>(StatusMongoRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createStatus', () => {
    it('should call statusRepository.create with the given entity and return an observable', () => {
      const entity: StatusMongoModel = {
        _id: '123',
        name: 'Test',
        description: 'Test',
      };

      const expected: Observable<StatusMongoModel> =
        new Observable<StatusMongoModel>();

      jest.spyOn(repository, 'create').mockReturnValue(expected);

      const result: Observable<StatusMongoModel> = service.createStatus(entity);

      expect(repository.create).toHaveBeenCalledWith(entity);
      expect(result).toBe(expected);
    });
  });

  describe('getStatus', () => {
    it('should call statusRepository.findOneById with the given id and return an observable', () => {
      const id: string = '123';

      const expected: Observable<StatusMongoModel> =
        new Observable<StatusMongoModel>();

      jest.spyOn(repository, 'findOneById').mockReturnValue(expected);

      const result: Observable<StatusMongoModel> = service.getStatus(id);

      expect(repository.findOneById).toHaveBeenCalledWith(id);
      expect(result).toBe(expected);
    });
  });
});
