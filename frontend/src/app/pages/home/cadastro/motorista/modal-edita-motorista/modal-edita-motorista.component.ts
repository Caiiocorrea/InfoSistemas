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
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { RegisterService } from 'src/app/services/http/register.service';

import { paymentsPix } from 'src/app/utils/payments.utils';

@Component({
	selector: 'app-modal-edita-motorista',
	templateUrl: './modal-edita-motorista.component.html',
	styleUrls: ['./modal-edita-motorista.component.scss'],
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
export class ModalEditaMotoristaComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public dialogData: any,
		private regiterService: RegisterService,
		private snackBar: MatSnackBar,
		private dialogRef: MatDialogRef<any>,
		private matDialog: MatDialog
	) {}

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

	ngOnInit(): void {
		this._formDriverInfo.patchValue(this.dialogData);
		this._formPaymentInfo.patchValue(this.dialogData);
	}

	toggleForm(idForm: number = 1) {
		this.boolAnim = !this.boolAnim;
		this.activeForm = idForm;
	}

	saveCNH(event: Event) {
		let image = (event.target as HTMLInputElement).files?.item(0);

		if (image) {
			this.fileCNH = image;
			this._formDriverInfo.patchValue({
				imagemCNH: this.fileCNH.name
			});

			this._formDriverInfo.controls['Pix'].value;
		}
	}

	deleteDriver(bitAtivo: number = 0) {
		const dialog = this.matDialog.open(ErrorMessageComponent, {
			autoFocus: false,
			panelClass: 'modal-errorMessage',
			data: {
				Title: 'Confirma exclusão de cadastro?',
				Message: 'Você solicitou a exclusão do seguinte motorista:',
				Value: this.dialogData.NomeCompleto || '',
				Confirm: 'Tem certeza que deseja excluir este cadastro?'
			}
		});

		dialog.afterClosed().subscribe(response => {
			if (response) {
				this.regiterService
					.deleteDrive(this.dialogData.IdMotorista, bitAtivo)
					.subscribe(
						(success: any) => {
							this.snackBar.open(
								bitAtivo === 1
									? 'Motorista reativado com sucesso'
									: 'Motorista deletado com sucesso',
								'Fechar',
								{ duration: 2500 }
							);

							if (bitAtivo === 0) {
								this.dialogRef.close(true);
							} else {
								this.activeForm = 1;
								this.dialogData.status = 'Ativo';
							}
						},
						error => {
							this.snackBar.open(
								`Ocorreu um erro: ${error.error.message}`,
								'Fechar',
								{ duration: 2500 }
							);
						}
					);
			}
		});
	}

	saveEdit() {
		if (!this._formPaymentInfo.valid && !this._formDriverInfo.valid) {
			this.snackBar.open('Preencha todos os campos', '', { duration: 2500 });
		} else {
			let body = {
				...this._formDriverInfo.value,
				...this._formPaymentInfo.value
			};

			this.regiterService.postDriver(body).subscribe(
				(success: any) => {
					this.snackBar.open('Alteração salva com sucesso', 'fechar', {
						duration: 2500
					});

					this.dialogRef.close(true);
				},
				error => {
					this.snackBar.open(`Ocorreu um erro: ${error.error.message}`);
				}
			);
		}
	}
}
