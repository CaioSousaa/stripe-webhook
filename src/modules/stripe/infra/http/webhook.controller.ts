import { Controller, Post, Req, Res, Headers } from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import {
  stripe,
  handleCheckoutSessionCompleted,
  handleSubscriptionSessionCompleted,
  handleCancelPlan,
} from '../../../../utils/stripe';

@Controller('/webhook')
export class WebhookController {
  @Post()
  async handleWebhook(
    @Req() req: Request & { rawBody?: Buffer },
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ): Promise<Response | void> {
    if (!req.rawBody) {
      console.error('Missing raw body for Stripe webhook');
      return res.status(400).send('Missing raw body');
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, signature, process.env.STRIPE_SECRET_ENDPOINT as string);
    } catch (err: any) {
      console.error(`⚠️ Webhook signature verification failed: ${err}`);
      return res.status(400).send(`Webhook Error: ${err}`);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionSessionCompleted(event);
        break;
      case 'customer.subscription.deleted':
        await handleCancelPlan(event);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).send();
  }
}
