import { User } from 'src/modules/user/domain/entities/User';
import { CreateUserDTO } from 'src/modules/user/dto/CreateUserDTO';
import { UpdateUserDTO } from 'src/modules/user/dto/UpdateUserDTO';
import { PrismaPortUserRepository } from 'src/modules/user/port/PrismaPortUserRepository';
import prisma from 'src/shared/prisma/prisma';

export class PrismaUserRepository implements PrismaPortUserRepository {
  public async findByStripeUserID(stripeUserId: string): Promise<User | undefined> {
    const data = await prisma.user.findFirst({ where: { stripeUserId: stripeUserId } });

    if (!data) {
      return;
    }

    const user = new User(
      {
        name: data?.name,
        email: data?.email,
        created_at: data?.created_at,
        stripeSubId: data?.stripeSubId ?? '',
        stripeSubStatus: data?.stripeSubStatus ?? '',
        stripeUserId: data?.stripeUserId ?? '',
      },
      data?.id,
    );

    return user ?? undefined;
  }
  public async update({ userId, stripeUserId, stripeSubId, stripeSubStatus }: UpdateUserDTO): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    const data = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        stripeUserId: stripeUserId ?? user?.stripeUserId,
        stripeSubId: stripeSubId ?? user?.stripeSubId,
        stripeSubStatus: stripeSubStatus ?? user?.stripeSubStatus,
      },
    });

    return new User(
      {
        name: data.name,
        email: data.email,
        created_at: data.created_at,
        stripeSubId: data.stripeSubId ?? '',
        stripeSubStatus: data.stripeSubStatus ?? '',
        stripeUserId: data.stripeUserId ?? '',
      },
      data.id,
    );
  }

  public async findById(userId: string): Promise<User | undefined> {
    const data = await prisma.user.findUnique({ where: { id: userId } });

    if (!data) {
      return;
    }

    const user = new User(
      {
        name: data?.name,
        email: data?.email,
        created_at: data?.created_at,
        stripeSubId: data?.stripeSubId ?? '',
        stripeSubStatus: data?.stripeSubStatus ?? '',
        stripeUserId: data?.stripeUserId ?? '',
      },
      data?.id,
    );

    return user ?? undefined;
  }

  public async get(): Promise<User[] | []> {
    const data = await prisma.user.findMany();

    if (data.length === 0) return [];

    const users = data.map((user) => {
      return new User(
        {
          name: user.name,
          email: user.email,
          created_at: user.created_at,
          stripeSubId: user.stripeSubId ?? '',
          stripeSubStatus: user.stripeSubStatus ?? '',
          stripeUserId: user.stripeUserId ?? '',
        },
        user.id,
      );
    });

    return users;
  }

  public async create({ email, name, stripeUserId }: CreateUserDTO): Promise<User> {
    const userData = await prisma.user.create({ data: { name, email, stripeUserId, created_at: new Date() } });

    const user = new User(
      {
        name: userData.name,
        email: userData.email,
        created_at: userData.created_at,
        stripeSubId: userData.stripeSubId ?? '',
        stripeSubStatus: userData.stripeSubStatus ?? '',
        stripeUserId: userData.stripeUserId ?? '',
      },
      userData.id,
    );

    return user;
  }
}
