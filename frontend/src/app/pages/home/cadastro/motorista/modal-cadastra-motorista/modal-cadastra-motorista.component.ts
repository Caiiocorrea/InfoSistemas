import { BreakpointObserver } from '@angular/cdk/layout';
import {
	StepperOrientation,
	STEPPER_GLOBAL_OPTIONS
} from '@angular/cdk/stepper';
import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RegisterService } from 'src/app/services/http/register.service';

import { paymentsPix } from 'src/app/utils/payments.utils';

@Component({
	selector: 'app-modal-cadastra-motorista',
	templateUrl: './modal-cadastra-motorista.component.html',
	styleUrls: ['./modal-cadastra-motorista.component.scss'],
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: {
				displayDefaultIndicatorType: false,
				showError: true
			}
		}
	]
})
export class ModalCadastraMotoristaComponent implements OnInit {
	constructor(
		private snackBar: MatSnackBar,
		private registerService: RegisterService,
		private dialogRef: MatDialogModule,
		private breakpointObserver: BreakpointObserver
	) {
		this.stepperOrientation = breakpointObserver
			.observe('(min-width: 800px)')
			.pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
	}

	// @ViewChild('fileCNH') fileCNH!: ElementRef<HTMLInputElement>;

	stepperOrientation: Observable<StepperOrientation>;

	_formGroupDriver = new FormGroup({
		NomeCompleto: new FormControl('', Validators.required),
		CpfCnpj: new FormControl('', Validators.required),
		CNH: new FormControl('', Validators.required),
		TipoCNH: new FormControl('', Validators.required),
		dataVencimento: new FormControl('', Validators.required),
		Celular: new FormControl('', Validators.required),
		imagemCNH: new FormControl('', Validators.required)
	});

	_formGroupPayment = new FormGroup({
		Banco: new FormControl('', Validators.required),
		Agencia: new FormControl('', Validators.required),
		NumeroConta: new FormControl('', Validators.required),
		Pix: new FormControl(''),
		ChavePix: new FormControl('')
	});

	paymentPix: string[] = paymentsPix;
	bankList: any;
	itsSaved: number = 0;
	idDriver!: number;

	fileCNH!: File;

	ngOnInit(): void {
		this.getBankList();
	}

	getBankList() {
		this.registerService.getBankList().subscribe(
			(success: any) => {
				this.bankList = success.data;
			},
			error => {
				this.snackBar.open(
					'Ocorreu um erro ao tentar recuperar a lista de bancos',
					'Fechar',
					{ duration: 2500 }
				);
			}
		);
	}

	saveCNH(event: Event) {
		let image = (event.target as HTMLInputElement).files?.item(0);

		if (image) {
			this.fileCNH = image;
			this._formGroupDriver.patchValue({
				imagemCNH: this.fileCNH.name
			});

			this._formGroupPayment.controls['Pix'].value;
		}
	}

	registerDriver() {
		if (!this._formGroupPayment.valid && !this._formGroupDriver.valid) {
			this.snackBar.open('Preencha todos os campos para continuar', 'Fechar', {
				duration: 2500
			});
		}

		let body = {
			...this._formGroupDriver.value,
			...this._formGroupPayment.value
		};

		let formData = new FormData();
		formData.set('file', this.fileCNH);

		this.registerService
			.postCNH(body)
			.pipe(
				switchMap(motorista => {
					return this.registerService.postDriver(body);
				})
			)
			.subscribe(
				success => {
					this.snackBar.open('Motorista cadastrado com sucesso', 'Fechar', {
						duration: 2500
					});
				},
				error => {
					this.snackBar.open(`Ocorreu um erro: ${error.error.message}`);
				}
			);
	}

	reactive(idDriver: number) {
		this.registerService.deleteDrive(this.idDriver, 1).subscribe(
			(success: any) => {
				this.snackBar.open('Motorista ativado com sucesso', 'Fechar', {
					duration: 2500
				});
				this.itsSaved = 1;
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
}
