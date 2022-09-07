import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	prod: boolean = environment.production;

	constructor() {}

	mouseOnTop = false;

	ngOnInit(): void {}

	@HostListener('document:mousemove', ['$event'])
	toggleHeader(event: MouseEvent): void {
		event.stopPropagation();
		this.mouseOnTop = event.clientY < 50;
	}
}
