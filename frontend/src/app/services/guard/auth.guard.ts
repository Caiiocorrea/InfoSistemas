import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	CanLoad,
	Route,
	Router,
	RouterStateSnapshot,
	UrlSegment,
	UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../http/token.service';
import { UserService } from '../http/user.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
	constructor(
		private userService: UserService,
		private tokenService: TokenService,
		private router: Router
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		if (!this.tokenService.returnToken()) {
			this.router.navigate(['/login']);
			return false;
		}

		return true;
	}
	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		if (!this.tokenService.returnToken()) {
			this.router.navigate(['/login']);
			return false;
		}

		return true;
	}
	canLoad(
		route: Route,
		segments: UrlSegment[]
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		if (!this.tokenService.returnToken()) {
			this.router.navigate(['/login']);
			return false;
		}

		return true;
	}
}
