import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  readonly name: string;

  @ApiProperty({ required: true })
  readonly email: string;

  @ApiProperty({ required: true })
  readonly phoneNumber: string;

  @ApiProperty({ required: true })
  readonly password: string;
}
