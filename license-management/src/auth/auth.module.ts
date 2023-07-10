/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { RegistrationModule } from 'src/registration/registration.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports:[RegistrationModule,PassportModule,JwtModule.register({
    secret:'asdasghgfhgfh355dfgfg345345',
    signOptions:{expiresIn:'1d'},
  })],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers:[AuthController]
})
export class AuthModule { }
