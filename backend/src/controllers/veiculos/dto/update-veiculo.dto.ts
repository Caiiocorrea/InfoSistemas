import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateVeiculoDto {
    @IsNotEmpty()
    @ApiProperty()
    placa: string

    @IsNotEmpty()
    @ApiProperty()
    chassi: string

    @IsNotEmpty()
    @ApiProperty()
    renavam: number

    @IsNotEmpty()
    @ApiProperty()
    modelo: string

    @IsNotEmpty()
    @ApiProperty()
    marca: string

    @IsNotEmpty()
    @ApiProperty()
    ano: number
}