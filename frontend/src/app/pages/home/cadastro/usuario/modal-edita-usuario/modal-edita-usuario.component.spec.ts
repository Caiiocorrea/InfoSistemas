import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditaUsuarioComponent } from './modal-edita-usuario.component';

describe('ModalEditaUsuarioComponent', () => {
	let component: ModalEditaUsuarioComponent;
	let fixture: ComponentFixture<ModalEditaUsuarioComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalEditaUsuarioComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalEditaUsuarioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
