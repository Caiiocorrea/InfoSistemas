import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
	selector: 'app-carregamento',
	templateUrl: './carregamento.component.html',
	styleUrls: ['./carregamento.component.scss']
})
export class CarregamentoComponent implements OnInit {
	separatorKeysCodes: number[] = [ENTER, COMMA];

	dealers: any = [];
	sugestDealers: any[] = [];
	dealderDatabase: any[] = [];

	@ViewChild('dealersInput') dealersInput!: ElementRef<HTMLInputElement>;

	constructor() {}

	ngOnInit(): void {}

	getRoutes(route: Event) {}

	add(route: MatChipInputEvent) {}

	addRouteList(route: MatAutocompleteSelectedEvent) {}

	removeRouteList(rota: any) {}
}
