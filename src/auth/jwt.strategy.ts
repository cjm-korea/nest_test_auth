import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./repository/user.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'SECRET_KEY',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const {username} = payload;
        const user: User = await this.userRepository.findOne({where: {username: username}});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}