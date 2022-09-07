import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { MessagesHelper } from '../../helpers/messages.helper';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { DeleteVeiculoDto } from './dto/delete-veculo.dto';
import { ReadVeiculoDto } from './dto/read-veiculo.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { VeiculosService } from './veiculos.service';
import { RolesGuard } from '../../guard/role.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller('api/v1/')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard) //Valida o token para acessar o recurso
export class VeiculosController {
    constructor(
        private readonly veiculosService: VeiculosService
    ) { }

    @Post('veiculo')
    @ApiBody({ type: CreateVeiculoDto, description: 'Cadastrar veículo' })
    create(@Body() createveiculodto: CreateVeiculoDto): Promise<CreateVeiculoDto> {
        return this.veiculosService.create(createveiculodto)
    }

    @Get('veiculo/:id')
    @ApiResponse({ description: 'Buscar único veículo' })
    findOne(@Param('id') id: string): Promise<ReadVeiculoDto[]> {
        return this.veiculosService.findOne(id);
    }

    @Get('veiculo')
    @ApiResponse({ description: 'Buscar todos os veículos' })
    findAll(@Query() dados: any) {
        return this.veiculosService.findAll(dados);
    }

    @Get('filtro')
    @ApiResponse({ description: 'Buscar todos os veículos' })
    filter(@Query() data: any): Promise<ReadVeiculoDto[]> {
        return this.veiculosService.filter(data);
    }

    @Put('veiculo/:id')
    @ApiBody({ type: UpdateVeiculoDto, description: 'Atualizar veículo' })
    update(@Param('id') id: string, @Body() data: UpdateVeiculoDto): Promise<UpdateVeiculoDto[]> {
        return this.veiculosService.update(id, data);
    }

    @Delete('veiculo/:id')
    @ApiBody({ type: DeleteVeiculoDto, description: 'Desativar veículo' })
    delete(@Param('id') id: string): Promise<DeleteVeiculoDto[]> {
        return this.veiculosService.delete(id);
    }
}
