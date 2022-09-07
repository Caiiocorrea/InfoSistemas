import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFranquiaComponent } from './modal-franquia.component';

describe('ModalFranquiaComponent', () => {
	let component: ModalFranquiaComponent;
	let fixture: ComponentFixture<ModalFranquiaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalFranquiaComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalFranquiaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
