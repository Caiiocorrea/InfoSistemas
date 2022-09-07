import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	templateUrl: './relatorio-entrada.component.html',
	styleUrls: ['./relatorio-entrada.component.scss']
})
export class RelatorioEntradaComponent implements OnInit {
	constructor() {}

	_form = new FormGroup({
		SKU: new FormControl('')
	});

	displayedColumns: string[] = [
		'Notify',
		'NomeCompleto',
		'Cargo',
		'Telefone',
		'Email',
		'CD',
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

	breakPoint: boolean = false;
	isLoading: boolean = true;

	ngOnInit(): void {}

	getEntradas(pageNumber: number) {}

	getFuncFAB(idFunc: Number) {
		switch (idFunc) {
			case 1:
				console.log('teste');
				break;
			default:
				console.log('erro');
		}
	}
}
