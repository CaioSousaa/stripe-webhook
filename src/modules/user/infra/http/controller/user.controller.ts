import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/modules/user/domain/entities/User';
import { CreateUserDTO } from 'src/modules/user/dto/CreateUserDTO';
import { CreateNewUserService } from 'src/modules/user/services/CreateNewUser.service';
import { GetUsersService } from 'src/modules/user/services/GetUsers.service';

@Controller('api/user')
export class UserController {
  constructor(
    private createUserService: CreateNewUserService,
    private getUsersService: GetUsersService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  public async handleCreate(@Body() data: CreateUserDTO): Promise<User> {
    return this.createUserService.execute(data);
  }

  @Get()
  public async handleGet(): Promise<User[] | []> {
    return this.getUsersService.execute();
  }
}
