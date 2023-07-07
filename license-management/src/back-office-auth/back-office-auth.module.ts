/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RegistrationModule } from 'src/registration/registration.module';
import { BackOfficeAuthController } from './back-office-auth/back-office-auth.controller';
import { BackOfficeAuthService } from './back-office-auth/back-office-auth.service';
import { MailerModule,MailerService } from '@nestjs-modules/mailer';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host:'smtp.gmail.com',
        auth:{
          user:'yayasoles@gmail.com',
          pass:'twxuavrlpzlcewjn'
        },
      }
    }),
  ],

  providers: [BackOfficeAuthService],
  controllers: [BackOfficeAuthController],
  exports:[BackOfficeAuthService]
})
export class BackOfficeAuthModule { }
