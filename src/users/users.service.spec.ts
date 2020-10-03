import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from 'ydr-nest-common';
import { userMockFactory, userResponseMockFactory } from './user.mock';
import { UserCreatePayload } from './user-create.payload';
import { UserResponse } from './user-response';

// TODO: error while trying to import this function from artifact
export const repositoryMockFactory: <T>() => MockType<Partial<Repository<T>>> = jest.fn(() => {
  return {
      findOne: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      save: jest.fn(),
      create: jest.fn()
  };
});


describe('UsersService', () => {
  let service: UsersService;
  let repository: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const userToCreate: UserCreatePayload = userMockFactory();
    let createdUser: UserResponse;

    beforeEach(async() => {
      repository.save.mockResolvedValueOnce(userToCreate as never); 
      createdUser = await service.create(userToCreate);
    });

    it('should call to save method of user repository', async() => {
      expect(repository.save).toBeCalledWith(userToCreate);
    });

    it('should return the created user', async() => {      
      expect(createdUser).toBeTruthy;
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async() => {
      const user = userResponseMockFactory();
      
      await service.findOne(user.id);

      expect(repository.findOne).toBeCalledWith( {where: {id: user.id}});
    });
  });

  describe('findOneByEmail', () => {
    it('should find a user by email', async() => {
      const user = userResponseMockFactory();
      
      await service.findOneByEmail(user.email);

      expect(repository.findOne).toBeCalledWith( {where: {email: user.email}});
    });
  });

  describe('checkCredentials', () => {
    it('should check user crendentials', async() => {
      const user = userMockFactory();
      
      await service.checkCredentials(user.email, user.password);

      expect(repository.findOne).toBeCalledWith( {where: {email: user.email, password: user.password}});
    });
  });
});

