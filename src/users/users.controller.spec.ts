import { UsersController } from './users.controller';
jest.mock('./users.service');
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userResponseMockFactory } from './user.mock';
import * as httpMocks from 'node-mocks-http';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [UsersService],
      }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [];
      jest.spyOn(usersService, 'findAll').mockImplementation(async() => result);

      expect(await usersController.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should accept a post request to create users', async() => {
      const result = userResponseMockFactory();
      jest.spyOn(usersService, 'create').mockImplementation(async() => result);
      const request = httpMocks.createRequest({
        method: 'POST',
        body: result
      });

      expect(await usersController.create(request.body)).toBe(result);  
    });
  });
});