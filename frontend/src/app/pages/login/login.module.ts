import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RecoveryComponent } from './recovery/recovery.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [LoginComponent, SignInComponent, RecoveryComponent],
	imports: [
		CommonModule,
		LoginRoutingModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatSnackBarModule,
		MatTooltipModule
	]
})
export class LoginModule {}
