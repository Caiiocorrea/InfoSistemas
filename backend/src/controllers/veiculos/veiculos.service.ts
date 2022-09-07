import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessagesHelper } from '../../helpers/messages.helper';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { DeleteVeiculoDto } from './dto/delete-veculo.dto';
import { ReadVeiculoDto } from './dto/read-veiculo.dto';
import { Veiculo } from '../../models/veiculo.model';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

@Injectable()
export class VeiculosService {
    constructor(
        @InjectModel('Veiculo')
        private veiculoModel: Model<Veiculo>
    ) { }

    async create(createveiculodto: CreateVeiculoDto): Promise<CreateVeiculoDto> {
        try {
            return await this.veiculoModel.findOne({ placa: createveiculodto.placa }).then(async (veiculo) => {
                if (veiculo) throw new HttpException({ message: 'Veículo já cadastrado.', veiculo: veiculo }, HttpStatus.BAD_REQUEST)
                else return new this.veiculoModel(createveiculodto).save()
            }).catch((error) => { return error })
        } catch (error) {
            throw new HttpException({ message: MessagesHelper.MESSAGE_500, error: `${error.message}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findOne(id: string): Promise<ReadVeiculoDto[]> {
        try {
            return await this.veiculoModel.findById({ _id: id })
        } catch (error) {
            throw new HttpException({ message: MessagesHelper.MESSAGE_500, error: `${error.message}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findAll(req: any): Promise<ReadVeiculoDto[]> {
        try {
            return await this.veiculoModel.find({ active: true })
        } catch (error) {
            throw new HttpException({ message: MessagesHelper.MESSAGE_500, error: `${error.message}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async update(id: string, updateveiculodto: UpdateVeiculoDto): Promise<UpdateVeiculoDto[]> {
        try {
            return await this.veiculoModel.findOneAndUpdate({ _id: id, active: true }, updateveiculodto, { new: true }).then((veiculo) => {
                if (veiculo) return { message: 'Veículo atualizado com sucesso.', veiculo }
                else return { message: 'Não foi possível atualizar o veículo, pois o mesmo encontra-se desativado.' }
            }).catch((error) => { return error })
        } catch (error) {
            throw new HttpException({ message: MessagesHelper.MESSAGE_500, error: `${error.message}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete(id: string, deleteveiculodto: DeleteVeiculoDto): Promise<DeleteVeiculoDto[]> {
        try {
            return await this.veiculoModel.findOneAndUpdate({ _id: id }, deleteveiculodto, { new: true }).then((veiculo) => {
                return { message: 'Veículo desativado com sucesso.', veiculo }
            }).catch((error) => { return error })
        } catch (error) {
            throw new HttpException({ message: MessagesHelper.MESSAGE_500, error: `${error.message}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
