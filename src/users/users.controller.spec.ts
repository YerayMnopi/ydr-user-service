import { UsersController } from './users.controller';
jest.mock('./users.service');
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';

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
      const result = ['test'];
      jest.spyOn(UsersService, 'findAll').mockImplementation(() => result);

      expect(await UsersController.findAll()).toBe(result);
    });
  });
});