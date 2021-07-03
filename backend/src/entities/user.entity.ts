import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// @Index('email', ['email'], { unique: true })
@Entity()
export class User {
  @ApiProperty({
    example: 1,
    description: 'user id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'popawaw@naver.com',
    description: 'user email',
  })
  @Column()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234',
    description: 'user password',
  })
  @Column()
  password: string;
}
