import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotoristaComponent } from './motorista/motorista.component';
import { TransportesComponent } from './transportes/transportes.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
	{ path: '', component: TransportesComponent, data: { title: 'Cadastros' } },
	{
		path: 'transportes',
		component: TransportesComponent,
		data: { title: 'Veículos' }
	},
	{
		path: 'motorista',
		component: MotoristaComponent,
		data: { title: 'Motoristas' }
	},
	{ path: 'usuario', component: UsuarioComponent, data: { title: 'Usuarios' } }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CadastroRoutingModule {}
