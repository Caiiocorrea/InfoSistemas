import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-mapa',
	templateUrl: './mapa.component.html',
	styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

	endereco!: any;

	ngOnInit(): void {
		console.log(this.data);

		this.endereco = this.data;
	}

	getLevel(andar: string) {
		switch (andar) {
			case '1':
				return 6;

			case '2':
				return 5;

			case '3':
				return 4;

			case '4':
				return 3;

			case '5':
				return 2;

			case '6':
				return 1;

			default:
				return false;
		}
	}

	getRoute() {}
}
