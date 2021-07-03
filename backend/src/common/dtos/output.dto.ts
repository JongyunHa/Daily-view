import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CoreOutput {
  @ApiProperty({
    example: true,
    description: 'success answer',
  })
  @IsBoolean()
  success: boolean;

  @ApiProperty({
    example: 'exist user email',
    description: 'error message',
  })
  @IsString()
  @IsOptional()
  error?: string;
}
