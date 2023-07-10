/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RegistrationModule } from 'src/registration/registration.module';
import { BackOfficeAuthController } from './back-office-auth/back-office-auth.controller';
import { BackOfficeAuthService } from './back-office-auth/back-office-auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { BackLocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports:[RegistrationModule,PassportModule,JwtModule.register({
      secret:'asdasghgfhgfh355dfgfg345345',
      signOptions:{expiresIn:'1d'},
    })],
    providers: [BackOfficeAuthService,JwtStrategy,BackLocalStrategy],
    controllers:[BackOfficeAuthController],
  })
export class BackOfficeAuthModule {}
