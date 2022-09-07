import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesRotaComponent } from './detalhes-rota.component';

describe('DetalhesRotaComponent', () => {
	let component: DetalhesRotaComponent;
	let fixture: ComponentFixture<DetalhesRotaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DetalhesRotaComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DetalhesRotaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
