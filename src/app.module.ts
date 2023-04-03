import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DynamicTestModule } from './dynamic-test/dynamic-test.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: ['.env.dev']
      }
    ),
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
    DynamicTestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
