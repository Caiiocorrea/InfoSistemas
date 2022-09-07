import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditaMotoristaComponent } from './modal-edita-motorista.component';

describe('ModalEditaMotoristaComponent', () => {
	let component: ModalEditaMotoristaComponent;
	let fixture: ComponentFixture<ModalEditaMotoristaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalEditaMotoristaComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalEditaMotoristaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
