import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import UsersRepository from "../users/users.repository";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { TransactionDocument } from "./entities/transaction.entity";
@Injectable()
export default class TransactionsRepository {
  constructor(
    @InjectModel("transactions")
    public readonly transactionModel: Model<TransactionDocument>,
    public readonly userRepository: UsersRepository
  ) {}
  async addTransaction(transaction: CreateTransactionDto) {
    try {
      return {
        data: await new this.transactionModel(transaction).save(),
        status: 201,
      };
    } catch (e) {
      return {
        data: e.message ?? "500 Internal server error execption",
        status: 500,
      };
    }
  }
  async deleteTransaction(id: string) {
    try {
      return (
        {
          data: await this.transactionModel.findByIdAndDelete(id),
          status: 200,
        } ?? {
          data: "the Transaction you want to delete doesn't exist",
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

  async getTransactionById(id: string) {
    try {
      const Transaction = await this.transactionModel.findById(id);
      if (!Transaction) {
        return {
          data: "Transaction not found",
          status: 404,
        };
      }
      return {
        data: Transaction,
        status: 200,
      };
    } catch (e) {
      return {
        data: e.message ?? "500 Internal server error execption",
        status: 500,
      };
    }
  }
  async getAllTransactions() {
    try {
      return (
        {
          data: (await this.transactionModel.find()).map((e) => e),
          status: 200,
        } ?? {
          data: "nothing was found",
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

  async findAllTransactionConcerningTheGivenUser(userId: string) {
    const Get = this.userRepository.getUserById;
    try {
      let data = await this.transactionModel.find({
        $or: [{ sender: userId }, { receiver: userId }],
      });
      if (!data) {
        return {
          data: "nothing was found",
          status: 404,
        };
      }
      // @ts-ignore
      data = data.map(async function (e) {
        return {
          ...e,
          sender: await Get(e.sender),
          receiver: await Get(e.receiver),
        };
      });
      console.log(data);
      return {
        data: data,
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
    return this.transactionModel;
  }
}
