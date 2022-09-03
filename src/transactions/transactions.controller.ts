import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  InternalServerErrorException,
  Res,
  Query,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";
import TransactionsNotFoundDto from "./dto/404-transaction.dto";
import TransactionNotFoundDto from "./dto/404-single-transaction.dto";

@ApiTags("Transactions")
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiBody({
    required: true,
    type: CreateTransactionDto,
    description: "user data",
  })
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: CreateTransactionDto,
    status: 201,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      "the server encountered an unexpected condition that prevented it from fulfilling the request.",
    type: InternalServerErrorException,
  })
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Res() response: Response
  ) {
    const transaction = await this.transactionsService.create(
      createTransactionDto
    );
    if (transaction.status !== 201) {
      return response.status(transaction.status).send(transaction);
    }
    return response.status(transaction.status).send(transaction.data);
  }

  @Get()
  @ApiOkResponse({
    description: "we found the transactions.",
    type: CreateTransactionDto,
    status: 200,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: "Nothing found",
    type: TransactionsNotFoundDto,
    status: 404,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      "the server encountered an unexpected condition that prevented it from fulfilling the request.",
    type: InternalServerErrorException,
  })
  async findAll(@Res() response: Response) {
    const allTransactions = await this.transactionsService.findAll();
    if (allTransactions.status !== 200) {
      return response.status(allTransactions.status).send(allTransactions);
    }
    return response.status(allTransactions.status).send(allTransactions.data);
  }

  @Get(":id")
  @ApiParam({
    required: true,
    description: "transaction id",
    name: "id",
  })
  @ApiOkResponse({
    description: "we found the transaction.",
    type: CreateTransactionDto,
    status: 200,
  })
  @ApiNotFoundResponse({
    description: "Nothing found",
    type: TransactionNotFoundDto,
    status: 404,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      "the server encountered an unexpected condition that prevented it from fulfilling the request.",
    type: InternalServerErrorException,
  })
  async findOne(@Param("id") id: string, @Res() response: Response) {
    const transaction = await this.transactionsService.findOne(id);
    if (transaction.status !== 200) {
      return response.status(transaction.status).send(transaction);
    }
    return response.status(transaction.status).send(transaction.data);
  }

  @Get("?user")
  @ApiNotFoundResponse({
    description: "Nothing found",
    type: TransactionsNotFoundDto,
    status: 404,
  })
  @ApiQuery({
    name: "user",
    description: "A user id",
    type: "string",
    example: "631143bb49147514cbd94c13",
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      "the server encountered an unexpected condition that prevented it from fulfilling the request.",
    type: InternalServerErrorException,
  })
  @ApiOkResponse({
    description: "we found the transaction.",
    type: CreateTransactionDto,
    status: 200,
    isArray: true,
  })
  async findAllTransactionConcerningTheGivenUser(
    @Query("user") userId: string,
    @Res() response: Response
  ) {
    return {};
    const transactions =
      await this.transactionsService.findAllTransactionConcerningTheGivenUser(
        userId
      );
    if (transactions.status !== 200) {
      return response.status(transactions.status).send(transactions);
    }
    return response.status(transactions.status).send(transactions.data);
  }
}
