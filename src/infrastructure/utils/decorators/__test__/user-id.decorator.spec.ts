import { Controller, Get } from '@nestjs/common';
import UserId from '../user-id.decorator';
import * as jwt from 'jsonwebtoken';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

@Controller('users')
class UserController {
  @Get()
  getUser(@UserId() userId: string) {
    return userId;
  }
}

describe('UserController', () => {
  let app: INestApplication;
  let userController: UserController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    app = moduleFixture.createNestApplication(); // Crear instancia de la aplicación
    await app.init(); // Inicializar la aplicación

    userController = app.get<UserController>(UserController);
  });

  it('should extract the user ID from the authorization token', async () => {
    // Arrange
    const id: string = 'tokenId';
    const token = jwt.sign({ id }, 'secret', { expiresIn: '1h' });
    const expectedUserId = id;

    // Act
    const server = app.getHttpServer(); // Obtener la instancia del servidor HTTP
    const response = await request(server) // Utilizar la instancia del servidor HTTP con `request`
      .get(`/users`)
      .set('Authorization', `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.text).toBe(expectedUserId);
  });

  it('should return undefined if the authorization token is not valid', async () => {
    // Arrange
    const id: string = 'tokenId';
    const expectedUserId = '';

    // Act
    const server = app.getHttpServer(); // Obtener la instancia del servidor HTTP
    const response = await request(server) // Utilizar la instancia del servidor HTTP con `request`
      .get(`/users`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.text).toBe(expectedUserId);
  });

  afterAll(async () => {
    await app.close();
  });
});
