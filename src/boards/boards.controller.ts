import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipte';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardService: BoardsService) { }

    @Get()
    getAllBoards(): Promise<Board[]> {
        return this.boardService.getAllBoards();
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoarDto: CreateBoardDto): Promise<Board> {
        return this.boardService.createBoard(createBoarDto);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.boardService.deleteBoard(id);
    }

    @Patch('/:id')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) boardStatus: BoardStatus
    ): Promise<Board> {
        return this.boardService.updateBoardStatus(id, boardStatus);
    }

    /*
    @Get('/')
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Board {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        return this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id') id:string, @Body('status', BoardStatusValidationPipe) status: BoardStatus): Board {
        return this.boardService.updateBoardStatus(id, status)
    }
    */
}
