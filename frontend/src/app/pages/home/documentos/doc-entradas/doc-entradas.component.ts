import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { DocumentsService } from 'src/app/services/http/documents.service';
import { ModalCadastraNFComponent } from './modal-cadastra-nf/modal-cadastra-nf.component';
import { ModalComentariosComponent } from './modal-comentarios/modal-comentarios.component';
import { ModalFranquiaComponent } from './modal-franquia/modal-franquia.component';
import { ModalInformacaoComponent } from './modal-informacao/modal-informacao.component';

@Component({
	templateUrl: './doc-entradas.component.html',
	styleUrls: ['./doc-entradas.component.scss']
})
export class DocEntradasComponent implements OnInit {
	_form = new FormGroup({
		status: new FormControl(''),
		cd: new FormControl(''),
		notaFiscal: new FormControl(''),
		entradaDe: new FormControl(new Date()),
		entradaAte: new FormControl(new Date()),
		fornecedor: new FormControl('')
	});

	displayedColumns: string[] = [
		'NOp',
		'Status',
		'NFs',
		'Entrada',
		'Motorista',
		'Veiculo',
		'ValorTotal',
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

	isLoading: boolean = true;
	breakPoint: boolean = false;

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
		rowspPage: number = 50,
		inactive: boolean = false
	) {
		this.documentServices
			.getDocuments({ pageNumber, rowspPage, inactive })
			.subscribe(
				(success: any) => {
					this.isLoading = false;
					this._dataSource = new MatTableDataSource(success.data);
				},
				error => {
					this.isLoading = false;
					this.snackBar.open('Ocorreu um erro.', 'Fechar', { duration: 2500 });
				}
			);
	}

	getDocumentFilter(
		pageNumber: number = 1,
		rowspPage: number = 50,
		inactive: boolean = false
	) {}

	openComments() {
		this.matDialog.open(ModalComentariosComponent, {
			autoFocus: false,
			panelClass: 'modal-comentarios',
			data: {
				Value: 'Testezinho'
			}
		});
	}

	openInformations() {
		this.matDialog.open(ModalInformacaoComponent, {
			autoFocus: false,
			panelClass: 'modal-information'
		});
	}

	openConferencia(cod: number) {
		this.matDialog.open(ModalFranquiaComponent, {
			autoFocus: false,
			panelClass: 'modal-conferencia',
			data: {
				cod
			}
		});
	}

	registerNF() {
		this.matDialog.open(ModalCadastraNFComponent, {
			autoFocus: false,
			panelClass: 'modal-createNF'
		});
	}

	removeDocument(value: string, element: any) {
		const dialog = this.matDialog.open(ErrorMessageComponent, {
			autoFocus: false,
			panelClass: 'modal-erroMessage',
			data: {
				Title: 'Confirma exclusão do documento?',
				Message: 'Você solicitou a exclusão do seguinte documento:',
				Value: '',
				Confirm: 'Tem certeza que deseja excluir este documento?'
			}
		});

		dialog.afterClosed().subscribe(response => {
			this.documentServices.removeDocument().subscribe((success: any) => {
				this.snackBar.open('Item removido com sucesso', 'Fechar', {
					duration: 2500
				});
			});
		});
	}

	getFuncFAB(idFunc: Number) {
		switch (idFunc) {
			case 1:
				this.registerNF();
				break;
			default:
				console.log('erro');
		}
	}
}
