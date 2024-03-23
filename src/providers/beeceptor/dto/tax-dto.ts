import { ApiProperty } from '@nestjs/swagger';

export class NameDto {
  @ApiProperty({ required: true })
  readonly firstName: string;

  @ApiProperty({ required: true })
  readonly lastName: string;
}

export class NewTaxDto {
  @ApiProperty({ required: true })
  readonly id: number;

  @ApiProperty({ type: NameDto })
  readonly name: NameDto;

  @ApiProperty({ required: true })
  readonly address: string;

  @ApiProperty({ required: true })
  readonly amount: number;

  @ApiProperty({ required: true })
  readonly approved: boolean;
}
