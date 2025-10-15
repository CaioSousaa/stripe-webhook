import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/modules/user/domain/entities/User';
import { CreateUserDTO } from 'src/modules/user/dto/CreateUserDTO';
import { CreateNewUserService } from 'src/modules/user/services/CreateNewUser.service';

@Controller('api/user')
export class UserController {
  constructor(private createUserService: CreateNewUserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  public async handleCreate(@Body() data: CreateUserDTO): Promise<User> {
    return this.createUserService.execute(data);
  }
}
