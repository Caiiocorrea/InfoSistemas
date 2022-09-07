import {
	animate,
	keyframes,
	state,
	style,
	transition,
	trigger
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { paymentsPix } from 'src/app/utils/payments.utils';

@Component({
	selector: 'app-modal-informacao',
	templateUrl: './modal-informacao.component.html',
	styleUrls: ['./modal-informacao.component.scss'],
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
export class ModalInformacaoComponent implements OnInit {
	constructor() {}

	_formDriverInfo = new FormGroup({
		NomeCompleto: new FormControl('', Validators.required),
		CpfCnpj: new FormControl('', Validators.required),
		CNH: new FormControl('', Validators.required),
		TipoCNH: new FormControl('', Validators.required),
		dataVencimento: new FormControl('', Validators.required),
		Celular: new FormControl('', Validators.required),
		imagemCNH: new FormControl('', Validators.required)
	});

	_formPaymentInfo = new FormGroup({
		Banco: new FormControl('', Validators.required),
		Agencia: new FormControl('', Validators.required),
		NumeroConta: new FormControl('', Validators.required),
		Pix: new FormControl(''),
		ChavePix: new FormControl('')
	});

	paymentPix: String[] = paymentsPix;
	fileCNH!: File;
	activeForm: number = 1;
	boolAnim: boolean = false;

	ngOnInit(): void {}

	toggleForm(idForm: number = 1) {
		this.boolAnim = !this.boolAnim;
		this.activeForm = idForm;
	}
}
