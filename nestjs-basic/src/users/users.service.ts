import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import {genSaltSync, hashSync, compareSync} from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './user.interface';
import { Company, CompanyDocument } from '../companies/schemas/company.schema';
import { CompaniesModule } from '../companies/companies.module';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) 
    private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>
  ) {}

  hashPassword = ( password:string ) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  isValidPassword(pass: string, hashPass: string){
    return compareSync(pass, hashPass);
  }

  async create(createUserDTO : CreateUserDto, iUser: IUser) {
    const hashPassword = this.hashPassword(createUserDTO.password);
    const isExist = await this.userModel.findOne({ email: createUserDTO.email});
    if(isExist){
      throw new BadRequestException(`Email ${createUserDTO.email} đã tồn tại!`)
    }
    createUserDTO.password = hashPassword;

    return this.userModel.create(createUserDTO);
  }

  async register(registerDto: RegisterUserDto){
    const {name, email, password, age, gender, address} = registerDto;
    const isExist = await this.userModel.findOne({ email: email});
    if(isExist){
      throw new BadRequestException(`Email ${email} đã tồn tại!`)
    }
    const hashPassword = this.hashPassword(password);
    const newRegister = await this.userModel.create({
      name, email,
      password: hashPassword,
      age,
      gender,
      address,
      role: "USER"
    })
    return newRegister;
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
    return await this.userModel.softDelete({_id: id});
  }
}
