import { IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  stripeUserId?: string;
}
