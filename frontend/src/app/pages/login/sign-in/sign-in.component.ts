import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/http/auth.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
	constructor(
		private matSnackbar: MatSnackBar,
		private loginService: AuthService,
		private router: Router
	) {}

	_form = new FormGroup({
		UserAcesso: new FormControl('', Validators.required),
		Senha: new FormControl('', Validators.required)
	});

	hide: boolean = true;

	ngOnInit(): void {}

	validate() {
		if (this._form.invalid) {
			this.matSnackbar.open('Preencha todos os campos', '', { duration: 2500 });
		} else {
			this.loginService.getLogin(this._form.value).subscribe(
				(success: any) => {
					this.router.navigateByUrl('home');
				},
				error => {
					console.log(error);
					this.matSnackbar.open('⛔ Usuario e/ou senha inválidos.', 'Fechar', {
						duration: 2500
					});
				}
			);
		}
	}
}
