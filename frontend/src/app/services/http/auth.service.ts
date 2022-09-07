import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

const API = environment.apiURL;

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(
		private HttpClient: HttpClient,
		private userService: UserService
	) { }

	getLogin(body: any) {
		return this.HttpClient.post(`${API}login`, body).pipe(
			tap(res => {
				let response: any = res;
				let token: any = response.token;

				this.userService.saveToken(token);
			})
		);
	}
}
