import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { Prop } from '@nestjs/mongoose';


export class Company {
    @IsNotEmpty()
    @Prop()
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string;
}
export class CreateUserDto {
    @IsString()
    @IsNotEmpty({message: "Không được để trống Name "})
    name: string;

    @IsEmail({}, {message: "Không đúng định dạng email"})
    @IsNotEmpty({message: "Không được để trống Email "})
    email: string;

    @IsString()
    @IsNotEmpty({message: "Không được để trống Password "})
    password: string;

    @IsNumber()
    @IsNotEmpty({message: "Không được để trống Age "})
    age: number;

    @IsString()
    @IsNotEmpty({message: "Không được để trống Gender "})
    gender: string;

    @IsString()
    @IsNotEmpty({message: "Không được để trống Address "})
    address: string;

    @IsString()
    @IsNotEmpty({message: "Không được để trống Role "})
    role: string;

    // Validate 1 thuộc tính có phải là 1 object không
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;
}

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty({message: "Không được để trống Name "})
    name: string;

    @IsEmail({}, {message: "Không đúng định dạng email"})
    @IsNotEmpty({message: "Không được để trống Email "})
    email: string;

    @IsString()
    @IsNotEmpty({message: "Không được để trống Password "})
    password: string;

    @IsNumber()
    @IsNotEmpty({message: "Không được để trống Age "})
    age: number;

    @IsString()
    @IsNotEmpty({message: "Không được để trống Gender "})
    gender: string;

    @IsString()
    @IsNotEmpty({message: "Không được để trống Address "})
    address: string;

}
