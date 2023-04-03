import { Body, Controller, Post } from '@nestjs/common';
import { DynamicTestService } from './dynamic-test.service';

@Controller('dynamic-test')
export class DynamicTestController {
    constructor(
        private dynamicTestService: DynamicTestService
    ) { }

    @Post()
    create(@Body() entityName: string, data: any) {
        return this.dynamicTestService.createEntity(entityName, data);
    }
}
