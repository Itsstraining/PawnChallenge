import { Controller, Get } from '@nestjs/common';
import { ChessGateway } from 'src/socketIO/Chess/chess.gateway';

@Controller('gateways')
export class GatewaysController {
    constructor(private chessGateway: ChessGateway) {}

    @Get('/chess')
    public async findAll() {
    }
}
