import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ModifyResult } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel('users') public readonly userModel: Model<UserDocument>,
  ) {}
  async addUser(
    user: CreateUserDto,
  ): Promise<User | InternalServerErrorException> {
    try {
      return await new this.userModel(user).save();
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
  async deleteUser(id: string) {
    try {
      return (
        await this.userModel.findByIdAndDelete(id) ??
        new NotFoundException()
      );
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
  async updateUser(id: string, user: UpdateUserDto) {
    try {
      return (
        await this.userModel.findByIdAndUpdate(id, user) ??
        new NotImplementedException()
      );
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
  async getUserById(
    id: string,
  ): Promise<UserDocument | InternalServerErrorException | NotFoundException> {
    try {
      const user = await this.userModel.findById(id, '-password');
      if (!(user instanceof BadRequestException)) {
        if (!user) {
          return new NotFoundException();
        }
      }
      return user;
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
  async getUserCollection(
    id: string,
  ): Promise<UserDocument | InternalServerErrorException | NotFoundException> {
    try {
      const user = await this.userModel.findById(id);
      if (!(user instanceof BadRequestException)) {
        if (!user) {
          return new NotFoundException();
        }
      }
      return user;
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
  async getAllUsers(): Promise<
    NotFoundException | InternalServerErrorException | UserDocument[]
  > {
    try {
      return (await this.userModel.find()).map((e) => e);
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }

  async addSubscription(
    userId: string,
    storeId: string,
  ): Promise<InternalServerErrorException | ModifyResult<UserDocument>> {
    try {
      return (
        (await this.userModel.findOneAndUpdate(
          {
            _id: userId,
          },
          {
            $push: {
              subscriptions: storeId,
            },
          },
        )) ?? new NotImplementedException()
      );
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }

  async removeSubscription(
    userId: string,
    storeId: string, // never to skip error i don't no for what
  ): Promise<InternalServerErrorException | ModifyResult<UserDocument>> {
    try {
      return (
        (await this.userModel.findOneAndUpdate(
          {
            _id: userId,
          },
          {
            $pull: {
              subscriptions: storeId,
            },
          },
        )) ?? new NotImplementedException()
      );
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }

  getModel() {
    return this.userModel;
  }
}
