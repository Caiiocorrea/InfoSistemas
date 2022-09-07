import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { RegisterService } from 'src/app/services/http/register.service';

import {
	Vehicle, vehicles, transportBody
} from 'src/app/utils/transports.utils';

export interface vechicleElement {
	_id: number;
	modelo: string;
	marca: string;
	placa: string;
	chassi: string;
	ano: number;
	renavam: number;
	active: string;
}

@Component({
	selector: 'app-modal-edita-transporte',
	templateUrl: './modal-edita-transporte.component.html',
	styleUrls: ['./modal-edita-transporte.component.scss'],
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
export class ModalEditaTransporteComponent implements OnInit {
	_formVehicle = new FormGroup({
		modelo: new FormControl('', Validators.required),
		marca: new FormControl('', Validators.required),
		placa: new FormControl('', Validators.required),
		chassi: new FormControl('', Validators.required),
		ano: new FormControl('', Validators.required)
	});

	_formDocuments = new FormGroup({
		renavam: new FormControl('', Validators.required)
	});

	vehicles: Vehicle = vehicles;
	vehicleNames = Object.keys(vehicles);
	idVehicle: number = 0;

	transportBodyes: Vehicle = transportBody;
	transportBodyNames = Object.keys(transportBody);

	canUpdate: boolean = false;
	activeForm: number = 1;
	boolAnim: boolean = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public dialogData: vechicleElement,
		private registerService: RegisterService,
		private matSnack: MatSnackBar,
		public dialogRef: MatDialogRef<any>,
		private matDialog: MatDialog
	) { }

	ngOnInit(): void {
		this._formDocuments.patchValue(this.dialogData);
		this._formVehicle.patchValue(this.dialogData);
	}

	toggleForm(idForm: number = 1) {
		this.boolAnim = !this.boolAnim;
		this.activeForm = idForm;
	}

	deleteVehicle(bitAtivo: number = 0) {
		const dialog = this.matDialog.open(ErrorMessageComponent, {
			autoFocus: false,
			panelClass: 'modal-errorMessage',
			data: {
				Title: 'Confirma exclusão de cadastro?',
				Message: 'Você solicitou a exclusão do seguinte motorista:',
				Value:
					`${this.dialogData.modelo} - ${this.dialogData.placa}` || '',
				Confirm: 'Tem certeza que deseja excluir este cadastro?'
			}
		});

		dialog.afterClosed().subscribe(response => {
			if (response) {
				this.registerService
					.deleteVehicle(this.dialogData._id, false)
					.subscribe(
						(success: any) => {
							this.matSnack.open(
								bitAtivo === 0
									? 'Veículo deletado com sucesso'
									: 'Veículo reativado com sucesso',
								'Fechar',
								{
									duration: 2500
								}
							);

							if (bitAtivo === 0) {
								this.dialogRef.close(true);
							} else {
								this.activeForm = 1;
								this.canUpdate = true;
								this.dialogData.active = 'Ativo';
							}
						},
						error => {
							this.matSnack.open(`Ocorreu um erro: ${error.error.message}`);
						}
					);
			}
		});
	}

	saveEdit() {
		if (!this._formVehicle.valid && !this._formDocuments.valid) {
			this.matSnack.open('Preencha todos os campos', '', { duration: 2500 });
		} else {
			let body = {
				...this._formDocuments.value,
				...this._formVehicle.value
			};

			this.registerService
				.putInfoVehicle(this.dialogData._id, body)
				.subscribe(
					(success: any) => {
						this.matSnack.open('Alteração salva com sucesso', 'fechar', {
							duration: 2500
						});
						this.dialogRef.close(true);
					},
					error => {
						this.matSnack.open(`Ocorreu um erro: ${error.error.message}`);
					}
				);
		}
	}
}
