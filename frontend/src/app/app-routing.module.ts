import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guard/auth.guard';
import { LoginGuard } from './services/guard/login.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./pages/login/login.module').then(m => m.LoginModule)
	},
	{
		path: 'login',
		loadChildren: () =>
			import('./pages/login/login.module').then(m => m.LoginModule)
	},
	{
		path: 'home',
		loadChildren: () =>
			import('./pages/home/home.module').then(m => m.HomeModule),
		canLoad: [AuthGuard],
		canActivateChild: [AuthGuard]
	},
	{
		path: 'cadastro',
		loadChildren: () =>
			import('./pages/home/cadastro/cadastro.module').then(
				m => m.CadastroModule
			)
	},
	{
		path: 'documentos',
		loadChildren: () =>
			import('./pages/home/documentos/documentos.module').then(
				m => m.DocumentosModule
			)
	},
	{
		path: 'estoque',
		loadChildren: () =>
			import('./pages/home/estoque/estoque.module').then(m => m.EstoqueModule)
	},
	{
		path: 'rotas',
		loadChildren: () =>
			import('./pages/home/rotas/rotas.module').then(m => m.RotasModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
