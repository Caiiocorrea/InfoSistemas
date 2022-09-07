import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInformacaoSaidasComponent } from './modal-informacao-saidas.component';

describe('ModalInformacaoSaidasComponent', () => {
	let component: ModalInformacaoSaidasComponent;
	let fixture: ComponentFixture<ModalInformacaoSaidasComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalInformacaoSaidasComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalInformacaoSaidasComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
