import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { authServiceMockFactory } from './local.strategy.spec';
import { AuthService } from './auth.service';
import { LoginPayload } from './dtos/login-payload';
import { MockType } from 'ydr-nest-common';
import { userResponseMockFactory } from '../users/user.mock';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: MockType<AuthService>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useFactory: authServiceMockFactory
      }],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get(AuthService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(authController).toBeTruthy();
    });
  });

  describe('login', () => {
    it('should return an access token', async() => {
      const loginPayload: LoginPayload = {
        email: 'test',
        password: 'pass'
      }

      const user = userResponseMockFactory();
      

      authService.validateUser.mockImplementation(() => Promise.resolve(user));

      await authController.login(loginPayload);

      expect(authService.login).toBeCalledWith(user);
    });
  });
});
