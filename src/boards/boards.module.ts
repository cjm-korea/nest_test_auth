import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './repository/board.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    AuthModule
  ],
  exports: [TypeOrmModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository]
})
export class BoardsModule {}
