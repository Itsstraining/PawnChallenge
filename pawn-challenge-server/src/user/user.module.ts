import { UserSchema } from './../message/schemas/user.shema';
import { Module } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './service/auth/auth.service';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
        ])
    ],
  controllers: [UserController],
  providers: [ UserService, AuthService],
})

export class UserModule {}