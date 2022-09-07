import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const APImock = environment.apiMock;

@Injectable({
	providedIn: 'root'
})
export class RotasService {
	constructor(private httpClient: HttpClient) {}

	getCards(params: any): Observable<any> {
		return this.httpClient.get(`${APImock}rotas?IdFase=${params.phase}`);
	}

	addCard(body: any) {
		return this.httpClient.post(`${APImock}rotas`, body);
	}

	changeCol(body: any) {
		return this.httpClient.put(`${APImock}rotas/${body.Rota}`, body);
	}
}
