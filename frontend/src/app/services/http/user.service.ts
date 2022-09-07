import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

import { User } from '../../models/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private userSubject = new BehaviorSubject<User>({});

	constructor(private tokenService: TokenService) {
		if (this.tokenService.getToken()) {
			this.decodeJWT();
		}
	}

	private decodeJWT() {
		const token = this.tokenService.returnToken();
		const user = jwt_decode(token) as User;

		this.userSubject.next(user);
	}

	retunUser() {
		return this.userSubject.asObservable();
	}

	saveToken(token: string) {
		this.tokenService.saveToken(token);
		this.decodeJWT();
	}

	logout() {
		this.tokenService.deleteToken();
		this.userSubject.next({});

		window.location.reload();
	}

	hasLogged() {
		return this.tokenService.getToken;
	}
}
