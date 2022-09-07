import * as mongoose from 'mongoose';

export const VeiculoSchema = new mongoose.Schema({
    placa: {
        type: String,
        required: true
    },
    chassi: {
        type: String,
        required: false
    },
    renavam: {
        type: Number,
        required: false
    },
    modelo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: false
    },
    ano: {
        type: Number,
        required: false,
        default: true
    },
    active: {
        type: Boolean,
        require: false,
        default: true
    }
});

export interface Veiculo {
    placa: string,
    chassi: string,
    renavam: number,
    modelo: number,
    marca: string,
    ano: number,
    active: boolean
}