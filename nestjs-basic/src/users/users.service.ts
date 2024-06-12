import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import {genSaltSync, hashSync, compareSync} from 'bcryptjs';

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

  isValidPassword(pass: string, hashPass: string){
    return compareSync(pass, hashPass);
  }
  async create(createUserDTO : CreateUserDto) {
    const hashPassword = this.hashPassword(createUserDTO.password);
    createUserDTO.password = hashPassword;
    let user = await this.userModel.create(createUserDTO);
    return user;
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)){
      throw new NotFoundException(`Not found user`);
    }
    return this.userModel.findById(id);
  }
  async findOneByUsername(username: string) {
    if(!mongoose.Types.ObjectId.isValid(username)){
      throw new NotFoundException(`Not found user`);
    }
    return this.userModel.findOne({
      email: username
    });
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({_id: updateUserDto._id}, {...updateUserDto});
  }

  async remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)){
      throw new NotFoundException(`Not found user`);
    }
    return await this.userModel.deleteOne({id});
  }
}
