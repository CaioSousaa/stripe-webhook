import { PrismaUserRepository } from 'src/modules/user/infra/prisma/repository/PrismaUserRepository';
import Stripe from 'stripe';

const userRepo = new PrismaUserRepository();

export const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  httpClient: Stripe.createFetchHttpClient(),
});

export const getUserAlreadyExistsInStripe = async (email: string) => {
  const users = await stripe.customers.list({ email });
  return users.data[0];
};

export const createUserInStripe = async (data: { name?: string; email: string }) => {
  const user = await getUserAlreadyExistsInStripe(data?.email);

  if (user) return;

  return stripe.customers.create({
    name: data.name,
    email: data.email,
  });
};

export const generateCheckout = async (userId: string, email: string) => {
  try {
    const customer = await createUserInStripe({ email });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      client_reference_id: userId,
      customer: customer?.id,
      success_url: `http://localhost:3000/done`,
      cancel_url: `http://localhost:3000/error`,
      line_items: [
        {
          price: process.env.STRIPE_ID_PRICE,
          quantity: 1,
        },
      ],
    });

    return {
      url: session.url,
    };
  } catch (err) {
    console.log('err', err);
  }
};

export const handleCheckoutSessionCompleted = async (event: { data: { object: Stripe.Checkout.Session } }) => {
  const userId = event.data.object.client_reference_id as string;
  const stripeSubId = event.data.object.subscription as string;
  const stripeUserId = event.data.object.customer as string;
  const checkoutStatus = event.data.object.status;

  if (checkoutStatus !== 'complete') return;

  if (!userId || !stripeSubId || !stripeUserId) {
    throw new Error('userId, stripeSubId, stripeUserId is required');
  }

  const userExist = await userRepo.findById(userId);

  if (!userExist) {
    throw new Error('user not found');
  }

  await userRepo.update({ userId, stripeSubId, stripeUserId });
};

export const handleSubscriptionSessionCompleted = async (event: { data: { object: Stripe.Subscription } }) => {
  const subscriptionStatus = event.data.object.status;
  const stripeCustumerId = event.data.object.customer as string;
  const stripeSubscriptionId = event.data.object.id;

  const userExist = await userRepo.findByStripeUserID(stripeCustumerId);

  if (!userExist) {
    throw new Error('user stripeCustumerId not found');
  }

  await userRepo.update({
    userId: userExist.id,
    stripeUserId: userExist.stripeUserId!,
    stripeSubId: stripeSubscriptionId,
    stripeSubStatus: subscriptionStatus,
  });
};

export const handleCancelPlan = async (event: { data: { object: Stripe.Subscription } }) => {
  const stripeCustumerId = event.data.object.customer as string;

  const userExist = await userRepo.findByStripeUserID(stripeCustumerId);

  if (!userExist) {
    throw new Error('user stripeCustumerId not found');
  }

  await userRepo.update({
    userId: userExist.id,
    stripeUserId: userExist.stripeUserId!,
    stripeSubStatus: '',
  });
};

export const handleCancelSubscription = async (idSubscriptions: string) => {
  const subscription = await stripe.subscriptions.update(idSubscriptions, {
    cancel_at_period_end: true,
  });

  return subscription;
};

export const createPortalCustomer = async (idCustomer: string) => {
  const subscription = await stripe.billingPortal.sessions.create({
    customer: idCustomer,
    return_url: 'http://localhost:3000/',
  });

  return subscription;
};
