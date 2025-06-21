import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/common/models/user.model';
import { JWTAccessOptions } from 'src/common/utils/jwt';
import { MailerModule } from 'src/common/maile/maile.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register(JWTAccessOptions),
    MailerModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
