import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guard/auth.guard';

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
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
