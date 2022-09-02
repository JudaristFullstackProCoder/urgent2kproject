import { Injectable, NotImplementedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDocument } from "./entities/user.entity";

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel("users") public readonly userModel: Model<UserDocument>
  ) {}
  async addUser(user: CreateUserDto) {
    try {
      return {
        data: await new this.userModel(user).save(),
        status: 201,
      };
    } catch (e) {
      return {
        data: e.message ?? "500 Internal server error execption",
        status: 500,
      };
    }
  }
  async deleteUser(id: string) {
    try {
      return (
        {
          data: await this.userModel.findByIdAndDelete(id),
          status: 200,
        } ?? {
          data: "the user you want to delete doesn't exist",
          status: 404,
        }
      );
    } catch (e) {
      return {
        data: e.message ?? "500 Internal server error execption",
        status: 500,
      };
    }
  }
  async updateUser(id: string, user: UpdateUserDto) {
    try {
      return {
        data: await this.userModel.findByIdAndUpdate(id, user),
        status: 200,
      };
    } catch (e) {
      return {
        data: e.message ?? "500 Internal server error execption",
        status: 500,
      };
    }
  }
  async getUserById(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return {
          data: "user not found",
          status: 404,
        };
      }
      return {
        data: user,
        status: 200,
      };
    } catch (e) {
      return {
        data: e.message ?? "500 Internal server error execption",
        status: 500,
      };
    }
  }
  async getAllUsers() {
    try {
      const users = await this.userModel.find();
      if (!users) {
        return {
          data: "nothing was found",
          status: 404,
        };
      }
      return {
        data: users.map((user) => user),
        status: 200,
      };
    } catch (e) {
      return {
        data: e.message ?? "500 Internal server error execption",
        status: 500,
      };
    }
  }

  getModel() {
    return this.userModel;
  }
}
