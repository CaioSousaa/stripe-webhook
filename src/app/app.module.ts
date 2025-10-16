import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripetModule } from 'src/modules/stripe/stripe.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), StripetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
