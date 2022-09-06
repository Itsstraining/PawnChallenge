import { User, UserDocument } from '../../schemas/user.schema';
import {
  Injectable,
  Body,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Model, Collection } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { MongoClient } from 'mongodb';
import * as env from 'environment';
import * as bcrypt from 'bcrypt';

const client = new MongoClient(env.environment.connectionString);
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  db = client.db('test');
  collection = this.db.collection('users');

  // async loginWithGoogle(user: User) {
  //   try {
  //     let userEmail = await this.userModel.findOne({ email: user.email });
  //     if (userEmail != null) {
  //       return 'login success';
  //     } else {
  //       let createAccount = new this.userModel(user);
  //       return await createAccount.save();
  //     }
  //   } catch (error) {
  //     throw new BadRequestException('user already exists');
  //   }
  // }

  async loginWithUserNameAndPassword(user: User) {
    try {
      let userIn = await this.userModel.findOne({ userName: user.userName });
      let passwordIn = await bcrypt.compare(user.password, userIn.password);
      if (userIn != null && passwordIn) {
        return 'login success';
      }
      throw new BadRequestException('username or password is incorrect');
    } catch (error) {
      throw new BadRequestException('username or password is incorrect');
    }
  }

  async createUser1(user: User) {
    try {
      const userCount = await this.userModel.countDocuments({
        userName: user.userName,
      });
      if (userCount > 0) {
        throw new Error('User not exists');
      } else {
        let createUser = new this.userModel(user);
        createUser.id = createUser._id;
        createUser.createAt = Date.now().toString();
        createUser.password = await bcrypt.hash(user.password, 10);
        await createUser.save();
        return { messs: `User [${user.id}] is created` };
      }
    } catch (error) {
      if (error.message == 'User not exists') {
        throw new HttpException('username is exist!', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'INTERNAL_SERVER_ERROR',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async createUser(user: User) {
    try {
      let userIn = await this.userModel.findOne({ email: user.email });
      if (userIn != null) {
        throw new BadRequestException('user already exists');
      } else {
        let createUser = new this.userModel(user);
        createUser.createAt = Date.now().toString();
        createUser.password = await bcrypt.hash(user.password, 10);
        return await createUser.save();
      }
    } catch (error) {
      // return error;
      throw new BadRequestException('user already exists');
    }
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findUserById(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(id: string, user: User) {
    try {
      const updateUser = await this.userModel
        .findByIdAndUpdate({ _id: id }, user, {
          new: true,
        })
        .exec();
      if (!updateUser) {
        throw new HttpException('Update Failure', HttpStatus.BAD_REQUEST);
      }
      return updateUser;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  // async deleteUser(id: string, user: User) {
  //   try {
  //     const updateUser = await this.userModel
  //       .findByIdAndUpdate({ _id: id }, user, {
  //         new: true,
  //       })
  //       .exec();
  //     if (!updateUser) {
  //       throw new HttpException('Update Failure', HttpStatus.BAD_REQUEST);
  //     }
  //     return updateUser;
  //   } catch (error) {
  //     return new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }


}
