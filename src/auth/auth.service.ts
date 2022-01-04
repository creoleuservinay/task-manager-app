import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/user-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
        private jwtService: JwtService,
    ) {
    }
    async signUp(authCredentialdto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialdto);
    }

    async singIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}