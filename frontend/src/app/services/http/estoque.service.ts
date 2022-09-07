import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const ApiMock = environment.apiMock;

@Injectable({
	providedIn: 'root'
})
export class EstoqueService {
	constructor(private HttpClient: HttpClient) {}

	getProdutos() {
		return this.HttpClient.get(`${ApiMock}produtos-estoque`);
	}
}
