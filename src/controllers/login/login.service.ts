import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessagesHelper } from '../../helpers/messages.helper';
// import { UpdateLoginDto } from './dto/update-login.dto';
import { CreateLoginDto } from './dto/create-login.dto';
import { ReadLoginDto } from './dto/read-login.dto';
import { Login } from '../../models/login.model';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { Model } from 'mongoose';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel('Login') private loginModel: Model<Login>,
    private readonly jwtService: JwtService,
  ) { }

  status() { return `InfoSistemas REST API executando com sucesso.` }

  async create(createLoginDto: CreateLoginDto): Promise<CreateLoginDto[]> {
    try {
      return await this.loginModel.find({ nome: createLoginDto.nome }).then(async (usuario) => {
        if (usuario[0]) throw new HttpException('Usuário já cadastrado.', HttpStatus.BAD_REQUEST)
        createLoginDto.senha = createHash('sha256').update(createLoginDto.senha).digest('hex')
        return new this.loginModel(createLoginDto).save()
      }).catch((error) => { return error })
    } catch (error) {
      throw new HttpException({ message: MessagesHelper.MESSAGE_500, error: `${error.message}` }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async login(readLoginDto: ReadLoginDto): Promise<any>  {
    try {
      const user = await this.loginModel.findOne({ emal: readLoginDto.email, senha: createHash('sha256').update(readLoginDto.senha).digest('hex') })
      return {
        message: "Autenticado com sucesso",
        user: {
          Id: user._id,
          Nome: user.nome,
          Email: user.email
        },
        token: this.jwtService.sign({
          Id: user._id,
          Nome: user.nome,
          Email: user.email
        })
      }
    } catch (error) {
      throw new HttpException({ message: MessagesHelper.MESSAGE_500, error: `${error.message}` }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async validateUser(id: string, email: string) {
    try {
      return await this.loginModel.find({ where: { id, email } })
    } catch (error) {
      throw new HttpException({ message: MessagesHelper.MESSAGE_500, error: `${error.message}` }, HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
}
