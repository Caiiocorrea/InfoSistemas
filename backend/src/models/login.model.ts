import * as mongoose from 'mongoose';

export const LoginSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: false,
        default: true
    },
});

export interface Login {
    nome: string,
    email: string,
    senha: string,
    active: boolean
}