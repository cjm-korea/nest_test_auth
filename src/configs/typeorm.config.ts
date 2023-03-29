import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const typeORMConfig : TypeOrmModuleOptions  = {
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.PORT),
    username: 'postgres',
    password: '1234',
    database: 'board-app',
    // entities: [__dirname + '/../**/*.entity.{js,ts}'],
    autoLoadEntities: true,
    synchronize: true
}