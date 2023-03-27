import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardRepository } from './repository/board.repository';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository
    ) { }

    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    getAllBoards(): Promise<Board[]> {
        return this.boardRepository.getAllBoards();
    }

    getBoardById(id:number): Promise<Board> {
        return this.boardRepository.getBoardById(id);
    }

    deleteBoard(id:number): Promise<string> {
        return this.boardRepository.deleteBoard(id);
    }

    updateBoardStatus(id: number, boardStatus: BoardStatus): Promise<Board> {
        return this.boardRepository.updateBoardStatus(id, boardStatus);
    }
    /* 
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto){
        const {title, description} = createBoardDto;
        const board: Board = {
            id: uuid(),
            title: title,
            description: description,
            status: BoardStatus.PUBLIC
        }
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);
        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
    */
}
