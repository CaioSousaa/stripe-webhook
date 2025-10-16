import { User } from '../domain/entities/User';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { UpdateUserDTO } from '../dto/UpdateUserDTO';

export interface PrismaPortUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  update(data: UpdateUserDTO): Promise<User>;
  findById(userId: string): Promise<User | undefined>;
  findByStripeUserID(stripeUserId: string): Promise<User | undefined>;
  get(): Promise<User[] | []>;
}
