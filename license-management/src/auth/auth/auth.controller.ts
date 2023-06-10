/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Post, Request, UseGuards,Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BackOfficeAuthController } from 'src/back-office-auth/back-office-auth/back-office-auth.controller';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }
    @UseGuards(LocalAuthGuard)
    // @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req): Promise<any> {
        
        return this.authService.generateToken(req.user)

    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getUser(@Request() req): Promise<any> { 
        return req.user
        // return this.authService.generateToken(req.user)
    }
}
