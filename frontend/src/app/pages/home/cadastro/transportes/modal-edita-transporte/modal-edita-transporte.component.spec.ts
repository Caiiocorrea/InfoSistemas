import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditaTransporteComponent } from './modal-edita-transporte.component';

describe('ModalEditaTransporteComponent', () => {
	let component: ModalEditaTransporteComponent;
	let fixture: ComponentFixture<ModalEditaTransporteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalEditaTransporteComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalEditaTransporteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
