import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ModalCadastraTransporteComponent } from './modal-cadastra-transporte/modal-cadastra-transporte.component';
import { RegisterService } from 'src/app/services/http/register.service';

import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import {
	Vehicle,
	vehicles,
	transportBody
} from 'src/app/utils/transports.utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalEditaTransporteComponent } from './modal-edita-transporte/modal-edita-transporte.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

export interface PeriodicElement {
	Modelo: string;
	Placa: string;
	TipoVeiculo: string;
	Carroceria: string;
	Renavam: string;
	Controls: any;
}

@Component({
	templateUrl: './transportes.component.html',
	styleUrls: ['./transportes.component.scss'],
	viewProviders: [MatExpansionPanel]
})
export class TransportesComponent implements OnInit {
	constructor(
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
		private httpRegister: RegisterService,
		private breakpointObserver: BreakpointObserver
	) {}

	@ViewChild(MatAccordion) accordion!: MatAccordion;

	_form = new FormGroup({
		modelo: new FormControl(''),
		placa: new FormControl(''),
		tipoVeiculo: new FormControl(''),
		modeloCaminhao: new FormControl(''),
		carroceria: new FormControl(''),
		renavam: new FormControl(''),
		inativo: new FormControl(false)
	});

	displayedColumns: string[] = [
		'Notify',
		'Modelo',
		'Placa',
		'TipoVeiculo',
		'Carroceria',
		'Renavam',
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

	vehicles: Vehicle = vehicles;
	vehicleNames = Object.keys(vehicles);
	transportBodyes: Vehicle = transportBody;
	transportBodyNames = Object.keys(transportBody);
	breakPoint: boolean = false;
	isLoading: boolean = true;

	ngOnInit(): void {
		this.getVehicles();

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
		this.getVehicles(this.currentPage, 20, event.checked);
	}

	getVehicles(
		pageNumber: number = 1,
		rowspPage: number = 20,
		inactive: boolean = false
	) {
		this.isLoading = true;

		this.httpRegister.getTransports(pageNumber, rowspPage, inactive).subscribe(
			(success: any) => {
				this._dataSource = new MatTableDataSource([...success.data]);
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
		this.isLoading = true;

		this.httpRegister
			.getTransportsFilter(this.currentPage, this.rowsPage, this._form.value)
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
		const dialog = this.dialog.open(ModalCadastraTransporteComponent, {
			autoFocus: false,
			panelClass: 'modal-default',
			data: {}
		});

		dialog.afterClosed().subscribe((modalResult: boolean) => {
			if (modalResult) {
				this.getVehicles(1, 20);
			}
		});
	}

	deleteVehicle(value: any = '', idVehicle: number) {
		const dialog = this.dialog.open(ErrorMessageComponent, {
			autoFocus: false,
			panelClass: 'modal-erroMessage',
			data: {
				Title: 'Confirma exclusão de cadastro?',
				Message: 'Você solicitou a exclusão do seguinte veículo:',
				Value: value || '',
				Confirm: 'Tem certeza que deseja excluir este cadastro?'
			}
		});

		dialog.afterClosed().subscribe(response => {
			if (response) {
				this.httpRegister.deleteVehicle(idVehicle).subscribe(
					(success: any) => {
						this.snackBar.open('Veículo deletado com sucesso', 'Fechar', {
							duration: 3000
						});
						this.getVehicles(1, 20);
					},
					error => {
						this.snackBar.open(`Ocorreu um erro: ${error.error.message}`);
					}
				);
			}
		});
	}

	edit(vehicle: any) {
		const dialog = this.dialog.open(ModalEditaTransporteComponent, {
			autoFocus: false,
			panelClass: 'modal-edit',
			data: { ...vehicle }
		});

		dialog.afterClosed().subscribe((modalResult: boolean) => {
			if (modalResult) {
				this.getVehicles(1, 20);
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
