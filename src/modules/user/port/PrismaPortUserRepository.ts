import { User } from '../domain/entities/User';
import { CreateUserDTO } from '../dto/CreateUserDTO';

export interface PrismaPortUserRepository {
  create(data: CreateUserDTO): Promise<User>;
}
