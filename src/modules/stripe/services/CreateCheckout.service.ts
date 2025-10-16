import { Inject, Injectable } from '@nestjs/common';
import { PrismaUserRepository } from 'src/modules/user/infra/prisma/repository/PrismaUserRepository';
import { PrismaPortUserRepository } from 'src/modules/user/port/PrismaPortUserRepository';
import { generateCheckout } from 'src/utils/stripe';

@Injectable()
export class CreateCheckoutService {
  constructor(@Inject(PrismaUserRepository) private userRepo: PrismaPortUserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      return;
    }

    const checkout = await generateCheckout(user.id, user.email);

    return checkout;
  }
}
