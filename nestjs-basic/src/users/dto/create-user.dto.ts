import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, {message: "Email khong dung dinh dang"})
    @IsNotEmpty({message: "Khong duoc de trong email"})
    email: string;

    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    age: number;
}
