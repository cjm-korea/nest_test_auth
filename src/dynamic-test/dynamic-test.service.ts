import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, EntitySchema, Repository, SelectQueryBuilder } from 'typeorm';
import { DynamicEntity } from './dynamic-test.entity';

@Injectable()
export class DynamicTestService {
    constructor(
        // @InjectEntityManager()
        // private readonly entityManager: EntityManager
        // @InjectRepository(DynamicEntity)
        // private readonly DynamicTestRespository: Repository<DynamicEntity>,
        private readonly entityManager: EntityManager
    ) {}

    async createEntity(entityName: string ,title: string): Promise<void> {
        // const dynamicEntity = this.entityManager.create({
        //     name: entityName,
        //     columns: Object.keys(data).map(key => ({ name: key, type: 'varchar'})),
        // })
        await this.entityManager.query(`CREATE TABLE ${entityName} ( id SERIAL PRIMARY KEY, title VARCHAR(20) );`);
        await this.entityManager.query(`INSERT INTO ${entityName} VALUES (${title});`);
        // await this.entityManager.save(dynamicEntity);
    }

    // async create(entityName: string, title: string): Promise<void> {
    //     const queryBuilder: SelectQueryBuilder<DynamicEntity> = this.DynamicTestRespository.createQueryBuilder(entityName);
    //     return await queryBuilder.select('*').from(entityName, 'test').execute();
    // }
    // async create(entityName: string, data: any){
    //     const repository = this.entityManager.getRepository(entityName);
    //     const entity = repository.create(data);
    //     return await repository.save(entity);
    // }
}
