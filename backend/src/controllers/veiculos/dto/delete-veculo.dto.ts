import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DeleteVeiculoDto {
    @IsNotEmpty()
    @ApiProperty()
    active: boolean
}