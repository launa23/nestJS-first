import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { create } from 'domain';

export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {
    _id: string;
}
