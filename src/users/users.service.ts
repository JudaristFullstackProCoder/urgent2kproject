import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UsersRepository from './users.repository';

@Injectable()
export class UsersService {
  constructor(@Inject(UsersRepository) private repository: UsersRepository) {}
  create(user: CreateUserDto) {
    return this.repository.addUser(user);
  }

  findAllUsers() {
    return this.repository.getAllUsers();
  }

  findOne(id: string) {
    return this.repository.getUserById(id);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    session: Record<string, unknown>,
  ) {
    const ownership = await this.checkOwnerShip(id, session);
    if (ownership !== true) {
      return ownership;
    }
    return this.repository.updateUser(id, updateUserDto);
  }

  async remove(id: string, session: Record<string, unknown>) {
    const ownership = await this.checkOwnerShip(id, session);
    if (ownership !== true) {
      return ownership;
    }
    return this.repository.deleteUser(id);
  }

  async checkOwnerShip(userId: string, session: Record<string, unknown>) {
    try {
      const product = await this.repository.getUserById(userId);
      if (
        product.status === 500 ||
        product.status === 404
      ) {
        return product;
      }
      if (userId !== session.user['_id']) {
        return {
          data:  'Sorry, you are not the owner of this resource',
          status: 401,
        }
      }
      return true;
    } catch (e) {
      return {
        data: e.message ?? 'Internal server error exception',
        status: 500,
      };
    }
  }
}
