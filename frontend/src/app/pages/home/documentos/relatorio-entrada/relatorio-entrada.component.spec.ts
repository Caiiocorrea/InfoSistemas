import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioEntradaComponent } from './relatorio-entrada.component';

describe('RelatorioEntradaComponent', () => {
	let component: RelatorioEntradaComponent;
	let fixture: ComponentFixture<RelatorioEntradaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RelatorioEntradaComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RelatorioEntradaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
