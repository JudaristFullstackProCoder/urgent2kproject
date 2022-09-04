import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { CountriesController } from "./countries/countries.controller";
import { AuthModule } from "./auth/auth.module";
import { TransactionsModule } from "./transactions/transactions.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/app"),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ["app.env"],
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    TransactionsModule,
  ],
  controllers: [AppController, CountriesController],
  providers: [AppService],
})
export class AppModule {}
