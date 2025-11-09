import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductQueryDto {
  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number = 0;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiProperty({ required: false, default: 'all' })
  @IsOptional()
  @IsString()
  category?: string = 'all';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  vendor?: string = '';

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  min?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  max?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  q?: string;
}

