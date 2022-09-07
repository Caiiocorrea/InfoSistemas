import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiLogz;
const APIsz = environment.apiURL;
const APImock = environment.apiMock;

@Injectable({
	providedIn: 'root'
})
export class RegisterService {
	constructor(private httpClient: HttpClient) {}

	getTransports(pageNumber: number, rowspPage: number, inactive: boolean) {
		return this.httpClient.get(
			`${API}veiculos?PageNumber=${pageNumber}&RowspPage=${rowspPage}&Inativo=${inactive}`
		);
	}

	//get

	getTransportsFilter(
		pageNumber: number = 1,
		rowspPage: number = 20,
		body: any
	) {
		return this.httpClient.get(
			`${API}veiculo?PageNumber=${pageNumber}&RowspPage=${rowspPage}&IdCaminhao=&Inativo=${body.inativo}&Placa=${body.placa}&Renavam=${body.renavam}&Carroceria=${body.carroceria}&TipoCaminhao=${body.tipoVeiculo}&ModeloCaminhao=${body.modeloCaminhao}`
		);
	}

	postVehicle(body: any) {
		return this.httpClient.post(`${API}veiculo`, body);
	}

	//Edit

	putInfoVehicle(idVehicle: number, body: any) {
		return this.httpClient.put(`${API}veiculo/${idVehicle}`, body);
	}

	//Delete - Update

	deleteVehicle(idVehicle: Number, bitAtivo: Number = 0) {
		return this.httpClient.delete(
			`${API}veiculo?IdVeiculo=${idVehicle}&bitAtivo=${bitAtivo}`
		);
	}

	// --------------- Motorista ----------------- //

	getDriver(pageNumber: number, rowspPage: number, inactive: boolean) {
		return this.httpClient.get(
			`${API}motoristas?PageNumber=${pageNumber}&RowspPage=${rowspPage}&Inativo=${inactive}`
		);
	}

	getDriverFilter(pageNumber: number = 1, rowspPage: number = 20, body: any) {
		return this.httpClient.get(
			`${API}motorista?PageNumber=${pageNumber}&RowspPage=${rowspPage}&IdMotorista=&NomeCompleto=${body.NomeCompleto}&CpfCnpj=${body.CpfCnpj}&Celular=${body.Celular}&CNH=${body.CNH}`
		);
	}

	getBankList() {
		return this.httpClient.get(`${APIsz}bancos`);
	}

	//post

	postDriver(body: any) {
		return this.httpClient.post(`${API}motorista`, body);
	}

	postCNH(body: any) {
		return this.httpClient.post(`${API}uploadCNH`, body);
	}

	//Delete - update

	deleteDrive(idDriver: number, bitAtive: number = 0) {
		return this.httpClient.delete(
			`${API}motorista?IdMotorista=${idDriver}&bitAtivo=${bitAtive}`
		);
	}

	// --------------- USuarios ----------------- //

	getUser(pageNumber: number, rowspPage: number, inactive: boolean) {
		return this.httpClient.get(`${APImock}usuarios`);
	}

	getUserFilter(pageNumber: number = 1, rowspPage: number = 20, body: any) {}

	postUser(body: any) {}

	putUser() {}

	deleteUser() {}
}
