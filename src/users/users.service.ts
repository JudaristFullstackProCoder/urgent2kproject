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

  async addSubscription(
    userId: string,
    storeId: string,
    session: Record<string, unknown>,
  ) {
    const ownership = await this.checkOwnerShip(userId, session);
    if (ownership !== true) {
      return ownership;
    }
    return this.repository.addSubscription(userId, storeId);
  }

  async removeSubscription(
    userId: string,
    storeId: string,
    session: Record<string, unknown>,
  ) {
    const ownership = await this.checkOwnerShip(userId, session);
    if (ownership !== true) {
      return ownership;
    }
    return this.repository.removeSubscription(userId, storeId);
  }

  async checkOwnerShip(userId: string, session: Record<string, unknown>) {
    try {
      const product = await this.repository.getUserById(userId);
      if (
        product instanceof InternalServerErrorException ||
        product instanceof NotFoundException
      ) {
        return product;
      }
      if (userId !== session.user['_id']) {
        return new UnauthorizedException(
          'Sorry, you are not the owner of this resource',
        );
      }
      return true;
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
}
