import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EstoqueService } from 'src/app/services/http/estoque.service';
import { MapaComponent } from './mapa/mapa.component';
import { ModalAssociadosComponent } from './modal-associados/modal-associados.component';

@Component({
	selector: 'app-estoque',
	templateUrl: './estoque.component.html',
	styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {
	_form = new FormGroup({
		SKU: new FormControl(''),
		nomeProduto: new FormControl(''),
		endereco: new FormControl(''),
		CD: new FormControl('')
	});

	displayedColumns: string[] = [
		'SKU',
		'Nome',
		'Endereco',
		'QtdReal',
		'QtdDisponivel',
		'ValorCusto',
		'ValorCaixa',
		'CD',
		'Controls'
	];

	FabOptions = {
		buttons: ['note_add']
	};

	_dataSource!: MatTableDataSource<any>;
	pageCount!: number;
	currentPage: number = 1;
	rowsPage: number = 20;
	totalRegisters: number = 0;

	breakPoint: boolean = false;

	constructor(
		private estoqueService: EstoqueService,
		private snackBar: MatSnackBar,
		private matDialog: MatDialog,
		private breakpointObserver: BreakpointObserver
	) {}

	ngOnInit(): void {
		this.getItens();

		this.breakpointObserver
			.observe(['(max-width: 900px)'])
			.subscribe((state: BreakpointState) => {
				if (state.matches) {
					this.breakPoint = true;
				} else {
					this.breakPoint = false;
				}
			});
	}

	getItens(pageNumber: number = 1) {
		this.estoqueService.getProdutos().subscribe(
			(success: any) => {
				this._dataSource = new MatTableDataSource(success);
			},
			error => {
				this.snackBar.open('Ocorreu um erro', 'Fechar', { duration: 2500 });
			}
		);
	}

	openMapa(endereco: any) {
		let [rua, andar, end] = endereco.Endereco.split('-');

		this.matDialog.open(MapaComponent, {
			autoFocus: false,
			panelClass: 'modal-mapa',
			data: {
				rua: rua,
				andar: andar,
				endereco: end
			}
		});
	}

	getOrders(SKU: string) {
		this.matDialog.open(ModalAssociadosComponent, {
			autoFocus: false,
			panelClass: 'modal-relacionados',
			data: {
				SKU
			}
		});
	}
}
