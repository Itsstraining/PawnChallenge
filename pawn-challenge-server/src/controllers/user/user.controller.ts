
import { AuthService } from 'src/services/auth/auth.service';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user/user.service';
import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  public async createUser(@Body() user: User, @Res() res: Response) {
    const _user = await this.userService.createUser(user);
    res.status(HttpStatus.CREATED).send({
      message: 'Registered User Successfully!!!',
      data: _user,
    });
  }
  @Get('/all')
  public async findAll() {
    return await this.userService.findAll();
  }

  @Post('/login')
  public async checkUserNameAndPassword(@Body() user: User) {
    return await this.userService.loginWithUserNameAndPassword(user);
  }

  @Post('/login/google')
  public async checkJWT(@Body() user: User, @Res() res: Response) {
    const _user = await this.userService.createUser(user);
    res.status(HttpStatus.CREATED).send({
      message: 'Registered User Successfully!!!',
      data: _user,
    });
  }

  @Get('/')
  public async findUserById(id: string) {
    return await this.userService.findUserById(id);
  }

  @Put('/update')
  public async updateUser(@Query(`id`) id: string, @Body() user: User) {
    return await this.userService.updateUser(id, user);
  }

  @Delete('/')
  public async deleteUser(@Query('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
