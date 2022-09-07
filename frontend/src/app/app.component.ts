import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavMobileService } from './services/nav-mobile.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'InfoSistemas';

	constructor(private router: Router, private service: NavMobileService) {}

	getDeepestChildSnapshot(
		snapshot: ActivatedRouteSnapshot
	): ActivatedRouteSnapshot {
		let deepestChild = snapshot.firstChild;
		while (deepestChild?.firstChild) {
			deepestChild = deepestChild.firstChild;
		}
		return deepestChild || snapshot;
	}

	ngOnInit(): void {
		this.router.events
			.pipe(filter(e => e instanceof ResolveEnd))
			.subscribe(e => {
				let { data } = this.getDeepestChildSnapshot(
					(e as ResolveEnd).state.root
				);
				if (data.title) {
					this.service.changeTitle(data.title);
				}
			});
	}
}
