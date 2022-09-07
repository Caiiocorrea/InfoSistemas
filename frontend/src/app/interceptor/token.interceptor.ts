import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/http/token.service';
import { UserService } from '../services/http/user.service';
import jwt_decode from 'jwt-decode';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(
		private tokenService: TokenService,
		private userService: UserService
	) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const token = this.tokenService.returnToken();
		if (request.url.endsWith('login')) {
			return next.handle(request);
		}

		let authRequest = request.clone({
			setHeaders: { Authorization: `Bearer ${token}` }
		});
		return next.handle(authRequest);
	}
}
