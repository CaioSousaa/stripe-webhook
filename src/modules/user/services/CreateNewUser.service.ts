import { Inject, Injectable } from '@nestjs/common';
import { PrismaUserRepository } from '../infra/prisma/repository/PrismaUserRepository';
import { PrismaPortUserRepository } from '../port/PrismaPortUserRepository';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { User } from '../domain/entities/User';
import { createUserInStripe } from 'src/utils/stripe';

@Injectable()
export class CreateNewUserService {
  constructor(@Inject(PrismaUserRepository) private userRepo: PrismaPortUserRepository) {}

  public async execute({ email, name }: CreateUserDTO): Promise<User> {
    const customerStripe = await createUserInStripe({ email, name });

    const user = await this.userRepo.create({ name, email, stripeUserId: customerStripe?.id });
    console.log(customerStripe);

    return user;
  }
}
