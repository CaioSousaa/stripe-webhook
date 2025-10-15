import { User } from 'src/modules/user/domain/entities/User';
import { CreateUserDTO } from 'src/modules/user/dto/CreateUserDTO';
import { PrismaPortUserRepository } from 'src/modules/user/port/PrismaPortUserRepository';
import prisma from 'src/shared/prisma/prisma';

export class PrismaUserRepository implements PrismaPortUserRepository {
  public async create({ email, name }: CreateUserDTO): Promise<User> {
    const userData = await prisma.user.create({ data: { name, email, created_at: new Date() } });

    const user = new User(
      {
        name: userData.name,
        email: userData.email,
        created_at: userData.created_at,
      },
      userData.id,
    );

    return user;
  }
}
