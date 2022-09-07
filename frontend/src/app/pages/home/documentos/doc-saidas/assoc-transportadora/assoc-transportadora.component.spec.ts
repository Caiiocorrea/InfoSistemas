import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssocTransportadoraComponent } from './assoc-transportadora.component';

describe('AssocTransportadoraComponent', () => {
	let component: AssocTransportadoraComponent;
	let fixture: ComponentFixture<AssocTransportadoraComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AssocTransportadoraComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AssocTransportadoraComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
