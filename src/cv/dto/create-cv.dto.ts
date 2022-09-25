import { ApiProperty } from "@nestjs/swagger";

export class CreateCvDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  github: string;

  @ApiProperty()
  linkin: string;

  @ApiProperty()
  description: string;
}
