import { Injectable } from '@angular/core';
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
import { UserService } from '../http/user.service';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanLoad {
	constructor(private userService: UserService, private router: Router) {}

	canLoad(
		route: Route,
		segments: UrlSegment[]
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		alert(!!this.userService.hasLogged());

		if (!!this.userService.hasLogged()) {
			this.router.navigate(['home']);

			return true;
		}

		this.router.navigate(['login']);
		return false;
	}
}
