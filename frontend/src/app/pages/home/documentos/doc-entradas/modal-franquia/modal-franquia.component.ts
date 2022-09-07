import {
	animate,
	keyframes,
	state,
	style,
	transition,
	trigger
} from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Inject, INJECTOR, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentsService } from 'src/app/services/http/documents.service';

@Component({
	selector: 'app-modal-franquia',
	templateUrl: './modal-franquia.component.html',
	styleUrls: ['./modal-franquia.component.scss'],
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
					transform: 'translate(-150%)'
				})
			),
			transition('open => void', [
				animate(
					'250ms ease-out',
					keyframes([
						style({ position: 'absolute', top: '50px' }),
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
export class ModalFranquiaComponent implements OnInit {
	constructor(
		private documentsService: DocumentsService,
		private snackBar: MatSnackBar,
		private brackpointObserver: BreakpointObserver,
		private matSnackBar: MatSnackBar,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	displayedColumns = [
		'Codigo',
		'NF',
		'SKU',
		'Nome',
		'Qtd',
		'QtdConf',
		'Conferencia'
	];
	searchBar = new FormControl();

	_dataModal!: any;
	_dataSource!: MatTableDataSource<any>;

	breakPoint: boolean = false;
	hasInfo: boolean = false;
	comments: string = '';
	isLoading: boolean = true;
	boolAnim: boolean = true;
	activeScreen: number = 1;

	ngOnInit(): void {
		console.log(this.data);

		this.documentsService.getDetails(this.data.cod).subscribe(
			(success: any) => {
				if (success.data.length > 0) {
					this.hasInfo = true;

					success.data[0].Itens.forEach((item: any) => {
						if (item.IdStatusDocumento === 4) {
							item.Conferido = true;
						} else if (item.IdStatusDocumento === 5) {
							item.Conferido = false;
						} else {
							item.Conferido = null;
							item.QuantidadeRecebida = null;
						}
					});
					this._dataSource = new MatTableDataSource(success.data[0].Itens);
					this.comments = success.data[0].observacao;
					this._dataModal = {
						DataInserido: success.data[0].DataInserido,
						Fornecedor: success.data[0].Fornecedor,
						IdDocRecebimento: success.data[0].IdDocRecebimento,
						InseridoPor: success.data[0].InseridoPor,
						NOp: success.data[0]?.NOp,
						Status: success.data[0].Status,
						Observacao: success.data[0].observacao
					};
				} else {
					this._dataSource = new MatTableDataSource();
				}
				this.isLoading = false;
			},
			error => {
				this.isLoading = false;
				this.matSnackBar.open(`[ERRO]: ${error.error.message}`, 'fechar', {
					duration: 2000
				});
			}
		);

		this.brackpointObserver
			.observe(['(max-width: 900px)'])
			.subscribe((state: BreakpointState) => {
				if (state.matches) {
					this.breakPoint = true;
				} else {
					this.breakPoint = false;
				}
			});
	}

	searchItem(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this._dataSource.filter = value.trim().toLowerCase();
	}

	changeStatus(element: any, type: string) {
		if (element.Conferido != null) {
			element.Conferido = !element.Conferido;
		} else {
			if (type === 'avaria') {
				element.Conferido = false;
			} else {
				element.Conferido = true;
			}
		}
	}

	changeQtdConf(element: any, value: Event) {
		let qtd = +(value.target as HTMLInputElement).value;
		element.QuantidadeRecebida = qtd;

		if (qtd === element.Quantidade) {
			element.Conferido = true;
		} else {
			element.Conferido = false;
		}
	}

	formatQtdConf(value: Event) {
		let qtd = +(value.target as HTMLInputElement).value;

		if (qtd <= 0) {
			(value.target as HTMLInputElement).value = '1';
			(value.target as HTMLInputElement).focus();
			this.snackBar.open('⛔ O valor precisa ser maior ou igual a 1', '', {
				duration: 2500
			});
			return;
		}
	}

	toggleComment(idScreen: number = 1) {
		if (this.activeScreen === 1) {
			this.activeScreen = 2;
		} else {
			this.activeScreen = 1;
		}

		this.boolAnim = !this.boolAnim;
	}

	returnConferido() {
		if (this.hasInfo) {
			if (this._dataSource.data.some((item: any) => item.Conferido)) {
				return false;
			} else {
				return true;
			}
		}
		return false;
	}

	saveChanges() {
		let body = {
			data: this._dataSource.data.map((item: any) => ({
				SKU: item.SKU,
				Quantidade: item.Quantidade,
				QuantidadeRecebida: item.QuantidadeRecebida
			})),
			NOp: this.data.cod
		};

		this.documentsService.updateConferred(body).subscribe(
			(success: any) => {
				this.matSnackBar.open('Informações salvas com sucesso!', 'Fechar', {
					duration: 2500
				});
			},
			error => {
				this.matSnackBar.open(`Ocorreu um erro: ${error.error.message}`);
			}
		);
	}
}
