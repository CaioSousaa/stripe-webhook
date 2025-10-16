import { Controller, Get, Param } from '@nestjs/common';
import { CreateCheckoutService } from '../../services/CreateCheckout.service';

@Controller('api/checkout')
export class CheckoutController {
  constructor(private createCheckoutService: CreateCheckoutService) {}

  @Get(':userId')
  public async handleCreate(@Param('userId') userId: string) {
    return await this.createCheckoutService.execute(userId);
  }
}
