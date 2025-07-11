import { Body, Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { refreshtokenDto } from './dto/refresh.token.dto';
import { UserRole } from 'src/global/type/user';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() payload: registerDto){
        return  this.authService.register(payload)
    }

    @Post("login")
    login(@Body() payload: loginDto){
       return  this.authService.login(payload)
    }

    @Post("refresh-token")
    refreshtoken(@Body() token: refreshtokenDto){
       return  this.authService.refreshtoken(token)
    }

}
