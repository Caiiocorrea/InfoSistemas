import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
	{ path: '', component: SignInComponent },
	{ path: 'login', component: SignInComponent },
	{ path: 'recovery', component: RecoveryComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LoginRoutingModule {}
