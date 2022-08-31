import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import TransactionsRepository from './transaction.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './entities/transaction.entity';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'transactions', schema: TransactionSchema }]),
    HttpModule,
],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository],
  exports: [TransactionsRepository]
})
export class TransactionsModule {}
