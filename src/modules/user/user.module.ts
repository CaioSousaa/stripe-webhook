import { Module } from '@nestjs/common';
import { CreateNewUserService } from './services/CreateNewUser.service';
import { PrismaUserRepository } from './infra/prisma/repository/PrismaUserRepository';
import { UserController } from './infra/http/controller/user.controller';

@Module({
  controllers: [UserController],
  providers: [CreateNewUserService, PrismaUserRepository],
})
export class UserModule {}
