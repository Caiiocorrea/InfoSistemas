import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastraTransporteComponent } from './modal-cadastra-transporte.component';

describe('ModalCadastraTransporteComponent', () => {
	let component: ModalCadastraTransporteComponent;
	let fixture: ComponentFixture<ModalCadastraTransporteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalCadastraTransporteComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalCadastraTransporteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
