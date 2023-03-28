import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Board } from "../board.entity";
import { CreateBoardDto } from "../dto/create-board.dto";
import { BoardStatus } from "../board-status.enum";
import { User } from "src/auth/user.entity";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user: user
        })

        await this.save(board);

        return board;
    }

    async getAllBoards(user: User): Promise<Board[]> {
        const query = this.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id });
        const boards = await query.getMany();
        return boards;
        // const found = await this.find();
        // if(!found){
        //     throw new NotFoundException('There are no Board!')
        // }
        // return found;
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.findOne({ where: { id: id } });
        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        await this.createQueryBuilder('board')
            .delete()
            .from(Board)
            .where('userId = :userId', { userId: user.id })
            .andWhere('id = :id', { id: id })
            .execute();
    }

    async updateBoardStatus(id: number, boardStatus: BoardStatus): Promise<Board> {
        const found = await this.getBoardById(id);
        found.status = boardStatus;
        await this.save(found);
        return found;
    }
}