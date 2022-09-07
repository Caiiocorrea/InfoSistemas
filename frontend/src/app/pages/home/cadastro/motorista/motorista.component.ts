import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterService } from 'src/app/services/http/register.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ModalCadastraMotoristaComponent } from './modal-cadastra-motorista/modal-cadastra-motorista.component';
import { ModalEditaMotoristaComponent } from './modal-edita-motorista/modal-edita-motorista.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

@Component({
	templateUrl: './motorista.component.html',
	styleUrls: ['./motorista.component.scss']
})
export class MotoristaComponent implements OnInit {
	constructor(
		private registerService: RegisterService,
		private snackBar: MatSnackBar,
		private dialog: MatDialog,
		private breakpointObserver: BreakpointObserver
	) {}

	_form = new FormGroup({
		NomeCompleto: new FormControl(''),
		CpfCnpj: new FormControl(''),
		Celular: new FormControl(''),
		CNH: new FormControl(''),
		inativo: new FormControl(false)
	});

	displayedColumns: string[] = [
		'Notify',
		'NomeCompleto',
		'CpfCnpj',
		'CNH',
		'Celular',
		'Controls'
	];

	FabOptions = {
		buttons: ['person_add']
	};

	_dataSource!: MatTableDataSource<any>;
	pageCount!: number;
	currentPage: number = 1;
	rowsPage: number = 20;
	totalRegisters: number = 0;

	isLoading: boolean = false;
	breakPoint: boolean = false;

	ngOnInit(): void {
		this.getDrivers();

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

	toggleInactive(event: MatSlideToggleChange) {
		console.log(event);
		this.getDrivers(this.currentPage, 20, event.checked);
	}

	getDrivers(
		pageNumber: number = 1,
		rowspPage: number = 20,
		inactive: boolean = false
	) {
		this.isLoading = true;

		this.registerService.getDriver(pageNumber, rowspPage, inactive).subscribe(
			(success: any) => {
				this._dataSource = new MatTableDataSource(success.data);
				this.pageCount = success.total_de_paginas_restantes;
				this.totalRegisters = success.total_de_registros;
				this.currentPage = pageNumber;

				this.isLoading = false;
			},
			error => {
				this.snackBar.open(`Ocorreu um erro: ${error.error.message}`, 'OK');
				this.isLoading = false;
			}
		);
	}

	getFilter() {
		this.registerService
			.getDriverFilter(this.currentPage, this.rowsPage, this._form.value)
			.subscribe(
				(success: any) => {
					this._dataSource = new MatTableDataSource(success.data);
					this.pageCount = success.total_de_paginas_restantes;
					this.totalRegisters = success.total_de_registros;
					this.isLoading = false;
				},
				error => {
					this.snackBar.open('Página não encontratada', 'fechar');
					this.isLoading = false;
				}
			);
	}

	register() {
		const dialog = this.dialog.open(ModalCadastraMotoristaComponent, {
			autoFocus: false,
			panelClass: 'modal-default'
		});

		dialog.afterClosed().subscribe((data: any) => {
			if (data) {
				this.getDrivers();
			}
		});
	}

	edit(element: any) {
		const dialog = this.dialog.open(ModalEditaMotoristaComponent, {
			autoFocus: false,
			panelClass: 'modal-edit',
			data: element
		});

		dialog.afterClosed().subscribe((data: any) => {
			if (data) {
				this.getDrivers();
			}
		});
	}

	deleteVehicle(value: any, IdDriver: any) {
		const dialog = this.dialog.open(ErrorMessageComponent, {
			autoFocus: false,
			panelClass: 'modal-erroMessage',
			data: {
				Title: 'Confirma exclusão de cadastro?',
				Message: 'Você solicitou a exclusão do seguinte motorista:',
				Value: value || '',
				Confirm: 'Tem certeza que deseja excluir este cadastro?'
			}
		});

		dialog.afterClosed().subscribe(response => {
			if (response) {
				this.registerService.deleteDrive(IdDriver).subscribe(
					(success: any) => {
						this.snackBar.open('Motorista deletado com sucesso', 'Fechar', {
							duration: 2500
						});
						this.getDrivers(1, 20);
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

	getFuncFAB(idFunc: Number) {
		switch (idFunc) {
			case 1:
				this.register();
				break;
			default:
				console.log('erro');
		}
	}
}
