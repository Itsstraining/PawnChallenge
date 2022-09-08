import { Controller, Get } from '@nestjs/common';
import { ChatGateway } from '../../socketIO/Chat/chat.gateway';

@Controller('gateways')
export class GatewaysController {
    constructor(private chessGateway: ChatGateway) {}

    @Get('/chess')
    public async findAll() {
    }
}
