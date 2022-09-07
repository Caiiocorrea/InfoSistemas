import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastraNFComponent } from './modal-cadastra-nf.component';

describe('ModalCadastraNFComponent', () => {
	let component: ModalCadastraNFComponent;
	let fixture: ComponentFixture<ModalCadastraNFComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalCadastraNFComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalCadastraNFComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
