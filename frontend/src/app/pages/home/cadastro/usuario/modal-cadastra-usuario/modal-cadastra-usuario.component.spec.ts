import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastraUsuarioComponent } from './modal-cadastra-usuario.component';

describe('ModalCadastraUsuarioComponent', () => {
	let component: ModalCadastraUsuarioComponent;
	let fixture: ComponentFixture<ModalCadastraUsuarioComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalCadastraUsuarioComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalCadastraUsuarioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
