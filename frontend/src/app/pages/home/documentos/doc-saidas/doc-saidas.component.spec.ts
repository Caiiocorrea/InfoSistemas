import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocSaidasComponent } from './doc-saidas.component';

describe('DocSaidasComponent', () => {
	let component: DocSaidasComponent;
	let fixture: ComponentFixture<DocSaidasComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DocSaidasComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DocSaidasComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
