import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;
@Injectable({
	providedIn: 'root'
})
export class RegisterService {
	constructor(private httpClient: HttpClient) { }

	getTransports(pageNumber: number, rowspPage: number, active: boolean) {
		return this.httpClient.get(
			`${API}veiculo?PageNumber=${pageNumber}&RowspPage=${rowspPage}&active=${active}`
		);
	}

	//get

	getTransportsFilter(
		body: any
	) {
		return this.httpClient.get(`${API}filtro?searchString=${body.modelo}`);
	}

	postVehicle(body: any) {
		return this.httpClient.post(`${API}veiculo`, body);
	}

	//Edit

	putInfoVehicle(idVehicle: number, body: any) {
		return this.httpClient.put(`${API}veiculo/${idVehicle}`, body);
	}

	//Delete - Update

	deleteVehicle(idVehicle: Number, active: boolean = false) {
		return this.httpClient.delete(
			`${API}veiculo/${idVehicle}?active=${active}`
		);
	}
}
