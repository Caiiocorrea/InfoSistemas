import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ReadVeiculoDto } from '../veiculos/dto/read-veiculo.dto';
import { MessagesHelper } from '../../helpers/messages.helper';
import { CreateLoginDto } from './dto/create-login.dto';
import { ReadLoginDto } from './dto/read-login.dto';
import { ApiBody } from '@nestjs/swagger';
import { LoginService } from './login.service';

@Controller('api/v1/')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post('usuario')
  create(@Body() createLoginDto: CreateLoginDto): Promise<CreateLoginDto[]> {
    return this.loginService.create(createLoginDto);
  }

  @Post('login')
  @ApiBody({ type: ReadLoginDto, description: 'Cadastrar veículo' })
  async login(@Body() readLoginDto: ReadLoginDto) {
    try {
      return await this.loginService.login(readLoginDto);
    } catch (error) {
      throw new HttpException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID, HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  status() {
    try {
      return { message: this.loginService.status() }
    } catch (error) {
      throw new HttpException(MessagesHelper.STATUS, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
