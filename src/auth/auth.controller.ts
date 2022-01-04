import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/user-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}
    @Post('/signup')
    singUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void>{
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/singin')
    singIn(@Body() authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }>{
        return this.authService.singIn(authCredentialDto);
    }
}
