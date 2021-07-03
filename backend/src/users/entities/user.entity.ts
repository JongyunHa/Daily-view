import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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
}
