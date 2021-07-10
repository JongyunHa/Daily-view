import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, Index } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Index('email', ['email'], { unique: true })
@Entity()
export class User extends CoreEntity {
  @ApiProperty({
    example: 'popawaw@naver.com',
    description: 'user email',
  })
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '엔지니어 하종윤',
    description: 'user nickname',
  })
  @Column()
  @IsString()
  nickname: string;

  @ApiProperty({
    example: '1234',
    description: 'user password',
  })
  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
