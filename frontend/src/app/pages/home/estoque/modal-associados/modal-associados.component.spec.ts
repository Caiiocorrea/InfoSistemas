import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssociadosComponent } from './modal-associados.component';

describe('ModalAssociadosComponent', () => {
	let component: ModalAssociadosComponent;
	let fixture: ComponentFixture<ModalAssociadosComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalAssociadosComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalAssociadosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
