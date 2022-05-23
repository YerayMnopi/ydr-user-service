import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreatePayload } from './user-create.payload';
import { UserResponse } from './user-response';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<UserResponse[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserResponse | undefined> {
    let user = await this.usersRepository.findOne({
      where: {id: id},
    });
    delete user.password;
    return user;
  }

  async findOneByEmail(email: string): Promise<UserResponse | undefined> {
    return this.usersRepository.findOne({where: {email: email}});
  }

  async create(userToCreate: UserCreatePayload): Promise<UserResponse | undefined> {
    return this.usersRepository.save(userToCreate);
  }

  async checkCredentials(email: string, password: string): Promise<UserResponse | undefined> {
    this.logger.log(`Checking ${email} user credentials`);
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      }
    });
    this.logger.log(user && password === user.password);
    return user && password === user.password ? user : null;
  }
}
