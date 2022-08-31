import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    // @ts-ignore
    return this.repository.insert(createUserDto);
  }

  findAll() {
    return this.findAll();
  }

  findOne(id: number) {
    return this.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(
      {
        id: id,
      },
      updateUserDto,
    );
  }

  remove(id: number) {
    return this.remove(id);
  }
}
