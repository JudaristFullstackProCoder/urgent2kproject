import { Inject, Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import TransactionsRepository from "./transaction.repository";

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(TransactionsRepository) private repository: TransactionsRepository
  ) {}
  create(createTransactionDto: CreateTransactionDto) {
    return this.create(createTransactionDto);
  }

  findAll() {
    return this.findAll();
  }

  findOne(id: string) {
    return this.findOne(id);
  }
}
