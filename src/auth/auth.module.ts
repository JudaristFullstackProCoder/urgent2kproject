import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  imports: [UsersModule],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
