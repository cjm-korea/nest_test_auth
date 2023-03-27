import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './repository/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: {
        // 3 minute
        expiresIn: 60 * 3
      }
    }),
    TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, JwtStrategy, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy]
})
export class AuthModule {}
