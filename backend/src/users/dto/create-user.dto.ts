import { PickType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDtoInput extends PickType(User, [
  'email',
  'password',
  'nickname',
] as const) {}
