import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class ReadLoginDto {
    // @ApiProperty()
    // nome: string

    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @ApiProperty()
    senha: string

    // @ApiProperty()
    // token: string
}
