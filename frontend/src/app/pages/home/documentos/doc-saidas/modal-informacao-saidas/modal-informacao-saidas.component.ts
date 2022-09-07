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
import {
	MatDialog,
	MatDialogRef,
	MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { paymentsPix } from 'src/app/utils/payments.utils';

@Component({
	selector: 'app-modal-informacao-saidas',
	templateUrl: './modal-informacao-saidas.component.html',
	styleUrls: ['./modal-informacao-saidas.component.scss'],
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
export class ModalInformacaoSaidasComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public dialogData: any,
		private snackBar: MatSnackBar,
		private dialogRef: MatDialogRef<any>,
		private matDialog: MatDialog
	) {}

	paymentPix: String[] = paymentsPix;
	fileCNH!: File;
	activeForm: number = 1;
	boolAnim: boolean = false;

	ngOnInit(): void {}

	toggleForm(idForm: number = 1) {
		this.boolAnim = !this.boolAnim;
		this.activeForm = idForm;
	}

	reactiveDocument(bitAtivo: number = 0) {}

	saveDocument() {}
}
