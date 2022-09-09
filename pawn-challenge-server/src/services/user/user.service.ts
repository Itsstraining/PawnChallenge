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
// import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

const client = new MongoClient(env.environment.connectionString);
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService) { }
  db = client.db('test');
  collection = this.db.collection('users');

  // async createUser(email: string, password: string) {
  //   try {
  //     const user = await this.userModel.findOne({ email: email });
  //     if (user) {
  //       throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  //     }
  //     const newUser = new this.userModel({ email: email, password: password });
  //     newUser.createAt = Date.now().toString();
  //     newUser.password = await bcrypt.hash(password, 10);
  //     await newUser.save();
  //     return newUser;
  //   } catch (error) {
  //     return new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // async loginWithEmailAndPassword(email: string, password: string) {
  //   try {
  //     const user = await this.userModel.findOne({ email: email });
  //     if (!user) {
  //       // console.log(user)
  //       throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  //     }
  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) {
  //       throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST);
  //     }
  //     // return user;
  //     throw new HttpException('Login success', HttpStatus.OK);
  //   } catch (error) {
  //     return new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // async loginWithFirebase(idToken: string) {
  //   try {
  //     const decodedToken = await this.authService.verifyToken(idToken);
  //     const user = await this.userModel.findOne({ email: decodedToken.email });
  //     if (!user) {
  //       throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  //     }
  //     // throw new HttpException('Login success', HttpStatus.OK);
  //     return user;
  //   } catch (error) {
  //     return new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // async createUserFromFirebase(user: User) {
  //   try {
  //     const user_Indb = await this.userModel.findOne({ email: user.email });
  //     // console.log(user_Indb);
  //     if (!user_Indb) {
  //       const newUser = new this.userModel();
  //       newUser.userName = user.email;
  //       newUser.email = user.email;
  //       newUser.createAt = Date.now().toString();
  //       const _user = await newUser.save();
  //       return _user;
  //     }
  //     if (user_Indb) {
  //       console.log(`user with email:${user.email} has just logined `)
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async findOne(email: string) {
    try {
      if (email) {
        const user = await this.userModel.findOne({
          email: email
        })
        return user._id;
      } else {
        return '';
      }
    } catch (err) {
      return err;
    }
  }


  // async createUser(user: User) {
  //   try {
  //     let userIn = await this.userModel.findOne({ email: user.email });

  //     if (!userIn) {
  //       throw new BadRequestException('user already exists');
  //     } else {
  //       let createUser = new this.userModel(user);
  //       createUser.createAt = Date.now().toString();
  //       createUser.password = await bcrypt.hash(user.password, 10);
  //       return await createUser.save();
  //     }
  //   } catch (error) {
  //     // return error;
  //     throw new BadRequestException('user already exists');
  //   }
  // }

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

  // async updateUser(id: string, user: User) {
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
