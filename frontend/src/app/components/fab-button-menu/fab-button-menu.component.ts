import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import { speedDialFabAnimations } from './fab-button-menu.animations';

@Component({
	selector: 'app-fab-button-menu',
	templateUrl: './fab-button-menu.component.html',
	styleUrls: ['./fab-button-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: speedDialFabAnimations
})
export class FabButtonMenuComponent implements OnInit {
	@Input() options: any;
	@Output() returnFunction = new EventEmitter<number>();

	buttons = [];
	fabTogglerState: boolean = false;

	constructor() {}

	ngOnInit() {
		const maxButtons = 6;
		if (this.options.buttons.length > maxButtons) {
			this.options.buttons.splice(5, this.options.buttons.length - maxButtons);
		}
	}

	returnFuction(idFunc: number) {
		this.hideItems();
		this.returnFunction.emit(idFunc);
	}

	showItems() {
		this.fabTogglerState = true;
		this.buttons = this.options.buttons;
	}

	hideItems() {
		this.fabTogglerState = false;
		this.buttons = [];
	}

	onToggleFab() {
		this.buttons.length ? this.hideItems() : this.showItems();
	}
}
