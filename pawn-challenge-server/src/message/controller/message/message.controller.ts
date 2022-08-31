import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { MessageService } from 'src/message/service/message/message.service';
import { Message } from '../../models/message.model';

@Controller('message')
export class MessageController {

    constructor(private messageService: MessageService ){}

    @Post('/send')
    public async sendMess(@Body() newMess: Message){
        return await this.messageService.create(newMess)
    }

    @Get('')
    public async getAll(){
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        return await this.messageService.findAll()
    }

}
