import { VeiculosController } from './veiculos.controller';
import { VeiculoSchema } from '../../models/veiculo.model';
import { VeiculosService } from './veiculos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    MongooseModule.forFeature([{
      name: 'Veiculo', schema: VeiculoSchema,
    }])
  ],
  controllers: [VeiculosController],
  providers: [VeiculosService,],
  exports: [VeiculosService],
})
export class VeiculosModule { }
