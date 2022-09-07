import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-modal-comentarios',
	templateUrl: './modal-comentarios.component.html',
	styleUrls: ['./modal-comentarios.component.scss']
})
export class ModalComentariosComponent implements OnInit {
	constructor() {}

	comentario: string = '';

	ngOnInit(): void {}
}
