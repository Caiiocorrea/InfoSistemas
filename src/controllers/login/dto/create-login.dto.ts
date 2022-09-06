import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateLoginDto {
    @IsNotEmpty()
    @ApiProperty()
    nome: string

    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @ApiProperty()
    senha: string
}
