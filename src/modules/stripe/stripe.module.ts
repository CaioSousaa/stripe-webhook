import { Module } from '@nestjs/common';
import { PrismaUserRepository } from '../user/infra/prisma/repository/PrismaUserRepository';
import { CheckoutController } from './infra/http/checkout.controller';
import { CreateCheckoutService } from './services/CreateCheckout.service';
import { WebhookController } from './infra/http/webhook.controller';

@Module({
  controllers: [CheckoutController, WebhookController],
  providers: [PrismaUserRepository, CreateCheckoutService],
})
export class StripetModule {}
