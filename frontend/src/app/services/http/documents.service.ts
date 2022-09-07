import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiLogz;
const MOCK = environment.apiMock;

@Injectable({
	providedIn: 'root'
})
export class DocumentsService {
	constructor(private httpService: HttpClient) {}

	getDocuments(body: any) {
		return this.httpService.get(
			`${API}documentosentrada?RowspPage=${body.rowspPage}&PageNumber=${body.pageNumber}`
		);
	}

	getProvide() {
		return this.httpService.get(`${MOCK}fornecedores`);
	}

	getDocumentsFilter() {}

	removeDocument() {
		return this.httpService.get(`${MOCK}delete`);
	}

	// Documentos de saida

	getDocumentsExit() {
		return this.httpService.get(`${MOCK}documentos-saida`);
	}

	getDetails(cod: number) {
		return this.httpService.get(
			`${API}documentoentrada?CodigoProcessamento=${cod}`
		);
	}

	updateConferred(body: any) {
		return this.httpService.put(`${API}documentoentrada`, body);
	}
}
