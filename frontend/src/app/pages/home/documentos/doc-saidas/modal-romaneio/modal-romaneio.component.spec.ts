import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRomaneioComponent } from './modal-romaneio.component';

describe('ModalRomaneioComponent', () => {
	let component: ModalRomaneioComponent;
	let fixture: ComponentFixture<ModalRomaneioComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalRomaneioComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalRomaneioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
