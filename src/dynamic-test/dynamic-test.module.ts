import { Module } from '@nestjs/common';
import { DynamicTestService } from './dynamic-test.service';
import { DynamicTestController } from './dynamic-test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicEntity } from './dynamic-test.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DynamicEntity])
  ],
  providers: [DynamicTestService],
  controllers: [DynamicTestController]
})
export class DynamicTestModule {}
