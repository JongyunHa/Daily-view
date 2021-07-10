import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Repository } from 'typeorm';
import { CreateUserDtoInput } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create({
    email,
    password,
    nickname,
  }: CreateUserDtoInput): Promise<CoreOutput> {
    try {
      const existUser = await this.findOneByEmail(email);
      if (existUser) {
        return {
          success: false,
          error: 'There is a user with that email already',
        };
      }
      const user = this.userRepository.create({
        email,
        password,
        nickname,
      });
      this.userRepository.save(user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
