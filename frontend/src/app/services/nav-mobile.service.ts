import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NavMobileService {
	openNav = new Subject();
	title = new BehaviorSubject<string>('');

	constructor() {}

	notify() {
		this.openNav.next();
	}

	binoculars() {
		return this.openNav.asObservable();
	}

	changeTitle(title: string) {
		this.title.next(title);
	}

	observeTitle() {
		return this.title.asObservable();
	}
}
