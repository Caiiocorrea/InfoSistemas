import { Injectable } from '@angular/core';

const TOKEN = 'TOKEN';

@Injectable({
	providedIn: 'root'
})
export class TokenService {
	constructor() {}

	returnToken() {
		return localStorage.getItem(TOKEN) ?? '';
	}

	getToken() {
		return !!this.returnToken();
	}

	saveToken(token: string) {
		localStorage.setItem(TOKEN, token);
	}

	deleteToken() {
		localStorage.removeItem(TOKEN);
	}
}
