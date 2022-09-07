import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocEntradasComponent } from './doc-entradas.component';

describe('DocEntradasComponent', () => {
	let component: DocEntradasComponent;
	let fixture: ComponentFixture<DocEntradasComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DocEntradasComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DocEntradasComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
