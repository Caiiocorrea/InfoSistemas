import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter
} from '@angular/core';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit {
	constructor(private breakpointObserver: BreakpointObserver) {}

	@Input() currentPage!: number;
	@Input() pageCount!: number;
	@Input() isMobile: boolean = false;
	@Output() returnPage = new EventEmitter<number>();

	ngOnInit(): void {}

	getPageValue(page: number) {
		console.log(page);
		this.returnPage.emit(page);
	}
}
