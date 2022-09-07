import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentsService } from 'src/app/services/http/documents.service';
import { AssocTransportadoraComponent } from './assoc-transportadora/assoc-transportadora.component';
import { ModalInformacaoSaidasComponent } from './modal-informacao-saidas/modal-informacao-saidas.component';
import { ModalInformacaoComponent } from './modal-informacao/modal-informacao.component';
import { ModalRomaneioComponent } from './modal-romaneio/modal-romaneio.component';

@Component({
	selector: 'app-doc-saidas',
	templateUrl: './doc-saidas.component.html',
	styleUrls: ['./doc-saidas.component.scss']
})
export class DocSaidasComponent implements OnInit {
	_form = new FormGroup({
		NotaFiscal: new FormControl(''),
		Status: new FormControl(''),
		CD: new FormControl(''),
		Rota: new FormControl(''),
		Transportadora: new FormControl(''),
		Municipio: new FormControl(''),
		Estado: new FormControl(''),
		tableControl: new FormControl(false)
	});

	displayedColumns: string[] = [
		'check',
		'NF',
		'Pedido',
		'Status',
		'CD',
		'Rota',
		'Transportadora',
		'QtdVolume',
		'Cliente',
		'ValorPedido',
		'Municipio',
		'Estado',
		'Saida',
		'Controls'
	];

	FabOptions = {
		buttons: ['shopping_cart', 'local_shipping']
	};

	_dataSource!: MatTableDataSource<any>;
	pageCount!: number;
	currentPage: number = 1;
	rowsPage: number = 20;
	totalRegisters: number = 0;

	isLoading: boolean = false;
	breakPoint: boolean = false;

	selection = new SelectionModel<any>(true, []);
	tableColumns: boolean = false;

	constructor(
		private documentServices: DocumentsService,
		private snackBar: MatSnackBar,
		private matDialog: MatDialog,
		private breakpointObserver: BreakpointObserver
	) {}

	ngOnInit(): void {
		this.getDocuments();

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

	getDocuments(
		pageNumber: number = 1,
		rowspPage: number = 20,
		inactive: boolean = false
	) {
		this.documentServices.getDocumentsExit().subscribe((success: any) => {
			this._dataSource = new MatTableDataSource(
				success.map((v: any) => ({ ...v, selected: false }))
			);
		});
		this.selection.clear();
	}

	getDocumentFilter() {
		this.selection.clear();
	}

	openComments() {}

	openInformations() {
		this.matDialog.open(ModalInformacaoSaidasComponent, {
			autoFocus: false,
			panelClass: 'modal-edit-docSaida',
			data: {}
		});
	}

	changeStatus() {}

	allSelected() {
		if (!this._dataSource) {
			return false;
		}
		let selectedRows = this.selection.selected.length;
		let rows = this._dataSource.data.length;

		return selectedRows === rows;
	}

	toggleAll() {
		if (this.allSelected()) {
			this.selection.clear();
		} else {
			this.selection.select(...this._dataSource.data);
		}
	}

	selectItem(element: any) {
		element.selected = !element.selected;

		console.log(element);
	}

	teste() {
		alert('sim');
	}

	getFuncFAB(idFunc: Number) {
		switch (idFunc) {
			case 1:
				this.selection.selected.length >= 1
					? this.openRomaneio()
					: this.snackBar.open('Selecione pelo menos um item');
				break;
			case 2:
				this.selection.selected.length >= 1
					? this.openShippingCompany()
					: this.snackBar.open('Selecione pelo menos um item');
				break;
			default:
				console.log('erro');
		}
	}

	openShippingCompany() {
		this.matDialog.open(AssocTransportadoraComponent, {
			autoFocus: false,
			panelClass: 'modal-ShippingCompany',
			data: {
				data: this.selection.selected
			}
		});
	}

	openRomaneio() {
		this.matDialog.open(ModalRomaneioComponent, {
			autoFocus: false,
			panelClass: 'modal-erroMessage',
			data: {
				data: this.selection.selected
			}
		});
	}

	tableView(event: MatSlideToggleChange) {
		if (event.checked) {
			this.displayedColumns = [
				'check',
				'NF',
				'Pedido',
				'Status',
				'Transportadora',
				'QtdVolume',
				'ValorPedido',
				'Saida',
				'Controls'
			];

			this.tableColumns = true;
		} else {
			this.displayedColumns = [
				'check',
				'NF',
				'Pedido',
				'Status',
				'CD',
				'Rota',
				'Transportadora',
				'QtdVolume',
				'Cliente',
				'ValorPedido',
				'Municipio',
				'Estado',
				'Saida',
				'Controls'
			];

			this.tableColumns = false;
		}
	}
}
