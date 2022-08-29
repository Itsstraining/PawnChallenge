import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/message/schemas/user.shema';
import { UserService } from 'src/user/service/user/user.service';
@Controller('user')
export class UserController {
    constructor(private UserService: UserService) {}

    @Post('/')
    public async createUser(@Body() newUser: User) {
        return await this.UserService.createUser(newUser);
    }

}
