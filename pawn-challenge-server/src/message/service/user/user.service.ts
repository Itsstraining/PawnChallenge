import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/message/schemas/user.shema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createUser(user: User) {
    let createUser = new this.userModel(user);
    createUser.id = createUser._id;
    createUser.createAt = new Date().toLocaleString();
    return await createUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  async findByUserName(userName: string): Promise<UserDocument> {
    return await this.userModel.findOne({ userName }).exec();
  }
  


}
