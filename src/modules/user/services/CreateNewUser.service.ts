import { Inject, Injectable } from '@nestjs/common';
import { PrismaUserRepository } from '../infra/prisma/repository/PrismaUserRepository';
import { PrismaPortUserRepository } from '../port/PrismaPortUserRepository';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { User } from '../domain/entities/User';

@Injectable()
export class CreateNewUserService {
  constructor(@Inject(PrismaUserRepository) private userRepo: PrismaPortUserRepository) {}

  public async execute({ email, name }: CreateUserDTO): Promise<User> {
    const user = await this.userRepo.create({ email, name });

    return user;
  }
}
