import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ReadVeiculoDto {
    @ApiProperty()
    _id: string

    @ApiProperty()
    placa: string

    @ApiProperty()
    chassi: string

    @ApiProperty()
    renavam: number

    @ApiProperty()
    modelo: number

    @ApiProperty()
    marca: string

    @ApiProperty()
    ano: number

    @ApiProperty()
    active: boolean
}