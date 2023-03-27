import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { AuthCreadentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialDto: AuthCreadentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCreadentialDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOne({ where: { username: username } });

        if (user && (await bcrypt.compare(password, user.password))) {
            // User token generate ( Secret + Payload )
            const payload = { username: username };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken: accessToken };
        } else {
            throw new UnauthorizedException('Login failed!');
        }
    }
}
