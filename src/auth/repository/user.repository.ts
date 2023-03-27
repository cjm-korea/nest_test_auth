import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "../user.entity";
import { AuthCreadentialDto } from "../dto/auth-credential.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialDto: AuthCreadentialDto): Promise<void> {
        const { username, password } = authCredentialDto;
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ username: username, password: hashedPassword });
        try {
            await this.save(user);
        } catch (error) {
            if(error.code === '23505'){
                throw new ConflictException('Existing username!');
            }else{
                throw new InternalServerErrorException();
            }
        }
    }
}