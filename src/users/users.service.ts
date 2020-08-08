import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({where: {id: id}});
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({where: {email: email}});
  }

  async create(userToCreate: User): Promise<User | undefined> {
    return this.usersRepository.save(userToCreate);
  }
}
