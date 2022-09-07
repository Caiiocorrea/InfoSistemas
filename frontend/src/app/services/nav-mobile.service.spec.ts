import { TestBed } from '@angular/core/testing';

import { NavMobileService } from './nav-mobile.service';

describe('NavMobileService', () => {
	let service: NavMobileService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(NavMobileService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
