import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RotasService } from 'src/app/services/http/rotas.service';

@Component({
	selector: 'app-add-rota',
	templateUrl: './add-rota.component.html',
	styleUrls: ['./add-rota.component.scss']
})
export class AddRotaComponent implements OnInit {
	constructor(
		private breakpointObserver: BreakpointObserver,
		private snackBar: MatSnackBar,
		private rotasServices: RotasService
	) {
		this.stepperOrientation = breakpointObserver
			.observe('(min-width: 800px)')
			.pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
	}

	stepperOrientation: Observable<StepperOrientation>;
	fileRota!: File;

	_formGroupRoute = new FormGroup({
		origem: new FormControl(''),
		destino: new FormControl(''),
		preco: new FormControl(0),
		previsaoEntrega: new FormControl(new Date()),
		Rota: new FormControl('')
	});

	itsSaved: number = 0;

	ngOnInit(): void {}

	generateValues() {
		let rota = Math.floor(Math.random() * 100_000) + 200_000;
		let peso = Math.floor(Math.random() * 9000) + 1000;

		return [rota, peso];
	}

	safeFile(event: Event) {
		let image = (event.target as HTMLInputElement).files?.item(0);

		if (image) {
			this.fileRota = image;
			this._formGroupRoute.patchValue({
				imagemCNH: this.fileRota.name
			});

			this._formGroupRoute.controls['Pix'].value;
		}
	}

	addCard() {
		if (!this._formGroupRoute.valid) {
			this.snackBar.open('Preencha todos os campos', '', { duration: 2500 });
		} else {
			let [rota, peso] = this.generateValues();

			let body = {
				id: rota,
				Rota: rota,
				DataCriacao: new Date(),
				Motorista: '',
				TipoPedido: 2,
				PrecisaoChegada: new Date(),
				Peso: peso,
				IdFase: 1
			};

			this.rotasServices.addCard(body).subscribe(
				(success: any) => {
					this.snackBar.open(
						`Cadastrado com sucesso na rota ${body.Rota}`,
						'fechar',
						{ duration: 2500 }
					);
					this.itsSaved = 1;
				},
				error => {
					this.snackBar.open('Ocorreu um erro');
					this.itsSaved = 2;
				}
			);
		}
	}
}
