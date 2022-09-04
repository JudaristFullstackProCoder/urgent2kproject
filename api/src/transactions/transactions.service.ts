import { Inject, Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import TransactionsRepository from "./transaction.repository";

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(TransactionsRepository) private repository: TransactionsRepository
  ) {}
  create(createTransactionDto: CreateTransactionDto) {
    return this.repository.addTransaction(createTransactionDto);
  }

  findAll() {
    return this.repository.getAllTransactions();
  }

  findOne(id: string) {
    return this.repository.getTransactionById(id);
  }

  findAllTransactionConcerningTheGivenUser(userId: string) {
    return this.repository.findAllTransactionConcerningTheGivenUser(userId);
  }
}
