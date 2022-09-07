import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{ path: '', component: DashboardComponent },
			{
				path: 'cadastro',
				loadChildren: () =>
					import('./cadastro/cadastro.module').then(m => m.CadastroModule)
			},
			{
				path: 'documentos',
				loadChildren: () =>
					import('./documentos/documentos.module').then(m => m.DocumentosModule)
			},
			{
				path: 'estoque',
				loadChildren: () =>
					import('./estoque/estoque.module').then(m => m.EstoqueModule)
			},
			{
				path: 'rotas',
				loadChildren: () =>
					import('./rotas/rotas.module').then(m => m.RotasModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule {}
