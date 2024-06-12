import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import {genSaltSync, hashSync} from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>
  ) {}

  hashPassword = ( password:string ) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async create(createUserDTO : CreateUserDto) {
    const hashPassword = this.hashPassword(createUserDTO.password);
    createUserDTO.password = hashPassword;
    let user = await this.userModel.create(createUserDTO);
    return user;
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)){
      throw new NotFoundException(`Not found user`);
    }
    return this.userModel.findById(id);
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({_id: updateUserDto._id}, {...updateUserDto});
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
