import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  data: T;

  @ApiProperty()
  executeDate: Date;

  @ApiProperty({ required: false })
  requestId?: string;

  @ApiProperty()
  httpStatus: number;

  constructor(data: T, httpStatus: number = 200, success: boolean = true) {
    this.success = success;
    this.data = data;
    this.executeDate = new Date();
    this.httpStatus = httpStatus;
  }
}
