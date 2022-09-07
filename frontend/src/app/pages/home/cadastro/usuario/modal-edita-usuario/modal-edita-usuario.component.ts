import {
	animate,
	keyframes,
	state,
	style,
	transition,
	trigger
} from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMAIL_PATTERN, matchFields } from 'src/app/utils/register.utils';
import { CD, jobs } from 'src/app/utils/user.utils';

export interface userElement {
	CD: string;
	Cargo: string;
	Email: string;
	NomeCompleto: string;
	Telefone: string;
	status: string;
}

@Component({
	selector: 'app-modal-edita-usuario',
	templateUrl: './modal-edita-usuario.component.html',
	styleUrls: ['./modal-edita-usuario.component.scss'],
	animations: [
		trigger('changeAnim', [
			state(
				'open',
				style({
					transform: 'translateX(0px)'
				})
			),
			state(
				'void',
				style({
					display: 'none',
					transform: 'translateX(-150%)'
				})
			),
			transition('open => void', [
				animate(
					'250ms ease-out',
					keyframes([
						style({ position: 'absolute' }),
						style({ transform: 'translateX(100%)', opacity: 1 })
					])
				)
			]),
			transition('void => *', [
				animate(
					'250ms 250ms ease-out',
					keyframes([
						style({
							display: 'grid',
							transform: 'translateX(-150%)',
							opacity: 0
						}),
						style({ transform: 'translateX(0px)', opacity: 1 })
					])
				)
			])
		])
	]
})
export class ModalEditaUsuarioComponent implements OnInit {
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

	canUpdate: boolean = false;
	activeForm: number = 1;
	boolAnim: boolean = false;

	jobListNames: any = jobs;
	CDListaNames: any = CD;

	constructor(@Inject(MAT_DIALOG_DATA) public dialogData: userElement) {}

	ngOnInit(): void {}

	toggleForm(idForm: number = 1) {
		this.boolAnim = !this.boolAnim;
		this.activeForm = idForm;
	}

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

	deleteUser(bitAtivo: number = 0) {}

	saveEdit() {}
}
