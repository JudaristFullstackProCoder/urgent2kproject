import { Module } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import TransactionsRepository from "./transaction.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionSchema } from "./entities/transaction.entity";
import { HttpModule } from "@nestjs/axios";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "transactions", schema: TransactionSchema },
    ]),
    HttpModule,
    UsersModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository],
  exports: [TransactionsRepository],
})
export class TransactionsModule {}
