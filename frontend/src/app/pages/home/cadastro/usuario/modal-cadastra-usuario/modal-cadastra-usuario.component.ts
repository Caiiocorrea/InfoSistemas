import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterService } from 'src/app/services/http/register.service';

import { CD, jobs } from 'src/app/utils/user.utils';
import { matchFields, EMAIL_PATTERN } from 'src/app/utils/register.utils';

@Component({
	selector: 'app-modal-cadastra-usuario',
	templateUrl: './modal-cadastra-usuario.component.html',
	styleUrls: ['./modal-cadastra-usuario.component.scss']
})
export class ModalCadastraUsuarioComponent implements OnInit {
	constructor(
		private snackBar: MatSnackBar,
		private breakpointObserver: BreakpointObserver,
		private registerService: RegisterService
	) {
		this.stepperOrientation = breakpointObserver
			.observe('(min-width: 800px)')
			.pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
	}

	stepperOrientation: Observable<StepperOrientation>;

	_formGroupUser = new FormGroup({
		NomeCompleto: new FormControl(''),
		CPF: new FormControl(''),
		Telefone: new FormControl(''),
		Email: new FormControl('', Validators.pattern(EMAIL_PATTERN))
	});

	_FormGroupAccess = new FormGroup(
		{
			Email: new FormControl('', Validators.pattern(EMAIL_PATTERN)),
			Senha: new FormControl(''),
			ConfSenha: new FormControl('')
		},
		{ validators: [matchFields('Senha', 'ConfSenha')] }
	);

	_FormGroupContract = new FormGroup({
		Cargo: new FormControl(''),
		CD: new FormControl('')
	});

	itsSaved: number = 0;
	idUser: number = 0;

	jobListNames: any = jobs;
	CDListaNames: any = CD;

	ngOnInit(): void {}

	checkPassword() {
		if (
			this._FormGroupAccess.controls['Senha'].value ===
				this._FormGroupAccess.controls['ConfSenha'].value &&
			this._FormGroupAccess.controls['ConfSenha'].value ===
				this._FormGroupAccess.controls['Senha'].value
		) {
			return true;
		}
		this._FormGroupAccess.setErrors({ invalid: true });
		return false;
	}

	registerUser() {}

	reactive(IdUser: number) {}
}
