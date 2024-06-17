import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Company, CreateUserDto } from './create-user.dto';
import { create } from 'domain';
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto{
    _id: string;

    @IsString()
    @IsNotEmpty({message: "Không được để trống Name "})
    name: string;

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
    @ValidateNested()
    @Type(() => Company)
    company?: Company;
}
