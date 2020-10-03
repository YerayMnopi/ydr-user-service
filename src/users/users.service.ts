import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreatePayload } from './user-create.payload';
import { UserResponse } from './user-response';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<UserResponse[]> {
    return this.usersRepository.find({
      select: Object.keys(UserResponse)
    });
  }

  async findOne(id: string): Promise<UserResponse | undefined> {
    return this.usersRepository.findOne({
      select: Object.keys(UserResponse),
      where: {id: id}
    });
  }

  async findOneByEmail(email: string): Promise<UserResponse | undefined> {
    return this.usersRepository.findOne({where: {email: email}});
  }

  async create(userToCreate: UserCreatePayload): Promise<UserResponse | undefined> {
    return this.usersRepository.save(userToCreate);
  }

  async checkCredentials(email: string, password: string): Promise<UserResponse | undefined> {

    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      } 
    });

    return password === user.password ? user : null;
  }
}
