import { Inject, Injectable } from '@nestjs/common';
import { PrismaUserRepository } from '../infra/prisma/repository/PrismaUserRepository';
import { PrismaPortUserRepository } from '../port/PrismaPortUserRepository';
import { User } from '../domain/entities/User';

@Injectable()
export class GetUsersService {
  constructor(@Inject(PrismaUserRepository) private userRepo: PrismaPortUserRepository) {}

  public async execute(): Promise<User[] | []> {
    const users = await this.userRepo.get();

    return users;
  }
}
