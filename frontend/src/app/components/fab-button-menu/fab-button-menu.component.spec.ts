import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabButtonMenuComponent } from './fab-button-menu.component';

describe('FabButtonMenuComponent', () => {
	let component: FabButtonMenuComponent;
	let fixture: ComponentFixture<FabButtonMenuComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FabButtonMenuComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FabButtonMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
