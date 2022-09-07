import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastraMotoristaComponent } from './modal-cadastra-motorista.component';

describe('ModalCadastraMotoristaComponent', () => {
	let component: ModalCadastraMotoristaComponent;
	let fixture: ComponentFixture<ModalCadastraMotoristaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalCadastraMotoristaComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalCadastraMotoristaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
