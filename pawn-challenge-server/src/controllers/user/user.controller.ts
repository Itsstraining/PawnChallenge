import { AuthService } from 'src/services/auth/auth.service';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user/user.service';
import { Controller, Get, Post, Body, Query, Delete, Req, Put, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { get } from 'http';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // @Post('/register')
  // public async createUser(@Body() user: User, @Res() res: Response) {
  //   const _user = await this.userService.createUser(user);
  //   res.status(HttpStatus.CREATED).send({
  //     message: 'Registered User Successfully!!!',
  //     data: _user,
  //   });
  // }

  // @Post('/login')
  // public async checkUserNameAndPassword(@Body() user: User) {
  //   return await this.userService.loginWithUserNameAndPassword(user);
  // }

  // @Post('/login/google')
  // public async checkIdToken(@Body() user: User, @Res() res: Response) {
  //   const _user = await this.userService.createUser(user);
  //   res.status(HttpStatus.CREATED).send({
  //     message: 'Registered User Successfully!!!',
  //     data: _user,
  //   });
  // }

  // @Get('/')
  // public async findUserById(@Query("_id") id: string) {
  //   return await this.userService.findUserById(id);
  // }

  // @Put('/')
  // public async deleteUser(@Query('_id') id: string, @Body() user: User) {
  //   return await this.userService.deleteUser(id, user);
  // }

  //done register
  // @Post('/register')
  // public async register(@Body() user: User, @Res() res: Response) {
  //   const _user = await this.userService.createUser(user.email, user.password);
  //   res.status(HttpStatus.CREATED).send({
  //     message: 'Registered User Successfully!!!',
  //     data: _user,
  //   });
  // }


  // @Post('/login')
  // public async loginWithEmailAndPassword(@Body() user: User, @Res() res: Response) {
  //   const _user = await this.userService.loginWithEmailAndPassword(user.email,user.password);
  //   console.log(_user);
  //     res.status(HttpStatus.OK).send({
  //       data: _user,
  //     });
  // }

  // @Post('/send')
  // public async createUserFromFirebase(@Req() req:any){
  //   return await this.userService.createUserFromFirebase(req.user);
  // }

  // @Get('id')
  // getUserId(@Req() req: any) {
  //   return this.userService.findOne(req.user.email);
  // }
  @Get('/all')
  public async findAll() {
    return await this.userService.findAll();
  }

  // @Get('/')
  // public async findUserById(@Query(`_id`) id: string) {
  //   return await this.userService.findUserById(id);
  // }

  // @Put('/')
  // public async updateUserById(@Query(`_id`) id: string, @Body() user: User) {
  //   return await this.userService.updateUser(id, user);
  // }
}
