import {
	CdkDragDrop,
	CdkDragMove,
	moveItemInArray,
	transferArrayItem
} from '@angular/cdk/drag-drop';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { RotasService } from 'src/app/services/http/rotas.service';
import { AddRotaComponent } from './add-rota/add-rota.component';
import { CarregamentoComponent } from './carregamento/carregamento.component';
import { DetalhesRotaComponent } from './detalhes-rota/detalhes-rota.component';

interface CrmCard {
	Rota: number;
	DataCriacao: Date;
	Motorista: string;
	TipoPedido: string;
	PrecisaoChegada: Date;
	Peso: number;
	IdFase: number;
}

@Component({
	selector: 'app-rotas',
	templateUrl: './rotas.component.html',
	styleUrls: ['./rotas.component.scss']
})
export class RotasComponent implements OnInit, AfterViewInit {
	constructor(
		private breakpointObserver: BreakpointObserver,
		private matDialog: MatDialog,
		private rotasServices: RotasService,
		private matSnackbar: MatSnackBar
	) {}
	_form = new FormGroup({
		rota: new FormControl(''),
		dataCriacao: new FormControl(''),
		tipo: new FormControl('')
	});
	breakPoint: boolean = false;
	leadList = [[], [], [], [], []] as CrmCard[][];
	titles = [
		'A receber',
		'Em trânsito',
		'Saiu para entrega',
		'Em atraso',
		'Avaria'
	];
	pages = [1, 1, 1, 1, 1];
	amount = [0, 0, 0, 0, 0];
	columns: any = [];
	indexScroll = 0;

	@ViewChild('crmContainer') scrollArea!: ElementRef<HTMLElement>;
	@ViewChildren('columnList') columnList!: QueryList<any>;

	ngAfterViewInit(): void {
		this.columns = this.columnList.toArray();
	}

	ngOnInit(): void {
		this.breakpointObserver
			.observe(['(max-width: 900px)'])
			.subscribe((state: BreakpointState) => {
				if (state.matches) {
					this.breakPoint = true;
				} else {
					this.breakPoint = false;
				}
			});
		this.getCards();
	}

	getCards() {
		let errors = 0;
		forkJoin({
			c1: this.rotasServices.getCards({ phase: 1, page: 1, rows: 2 }).pipe(
				catchError(error => {
					errors++;
					return of(null);
				})
			),
			c2: this.rotasServices.getCards({ phase: 2, page: 1, rows: 2 }).pipe(
				catchError(error => {
					errors++;
					return of(null);
				})
			),
			c3: this.rotasServices.getCards({ phase: 3, page: 1, rows: 2 }).pipe(
				catchError(error => {
					errors++;
					return of(null);
				})
			),
			c4: this.rotasServices.getCards({ phase: 4, page: 1, rows: 2 }).pipe(
				catchError(error => {
					errors++;
					return of(null);
				})
			),
			c5: this.rotasServices.getCards({ phase: 5, page: 1, rows: 2 }).pipe(
				catchError(error => {
					errors++;
					return of(null);
				})
			)
		}).subscribe(respose => {
			console.log(respose);
			let { c1, c2, c3, c4, c5 } = respose;
			[c1, c2, c3, c4, c5].forEach((v: any, i) => {
				if (!v) {
					return;
				}
				this.amount[i] = v.length;
				this.leadList[i] = v.map((v: any) => ({
					Rota: v.Rota,
					DataCriacao: v.DataCriacao,
					Motorista: v.Motorista,
					TipoPedido: v.TipoPedido,
					PrecisaoChegada: v.PrecisaoChegada,
					Peso: v.Peso,
					IdFase: v.IdFase
				}));
			});
		}),
			(error: any) => {
				this.matSnackbar.open('Ocorreu um erro', 'fechar');
			};
	}

	getCardFilter() {}

	openAddRota() {
		this.matDialog.open(AddRotaComponent, {
			autoFocus: false,
			panelClass: 'modal-add-rota'
		});
	}

	openAddCarregamento() {
		this.matDialog.open(CarregamentoComponent, {
			autoFocus: false,
			panelClass: 'modal-createNF'
		});
	}

	scroll(number: number) {
		if (
			(number > 0 && this.indexScroll < this.columnList.length - 1) ||
			(number < 0 && this.indexScroll > 0)
		) {
			if (this.breakPoint) {
				this.indexScroll += number;
				let x = this.columnList.toArray();
				x[this.indexScroll].nativeElement.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
					inline: 'center'
				});
			}
		}
	}

	drop(event: CdkDragDrop<any[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);

			//Atribui o Parent da coluna atual para o card e salva as alterações
			event.container.data[event.currentIndex].IdFase = Number(
				event.container.id
			);

			this.dropCard(event.item.data);
		}
	}

	dropCard(Card: any) {
		let x = this.columnList.toArray();
		x[Card.IdFase - 1].nativeElement.scrollIntoView({
			behavior: 'smooth',
			inline: 'center'
		});
		this.indexScroll = Card.IdFase - 1;

		this.rotasServices.changeCol(Card).subscribe((success: any) => {
			this.matSnackbar.open('Cardo movido com sucesso', '', { duration: 750 });
		});

		return true;
	}

	showDetails(card: any) {
		this.matDialog.open(DetalhesRotaComponent, {
			autoFocus: false,
			panelClass: 'modal-details-rota',
			data: {
				card
			}
		});
	}

	scrollCard(event: CdkDragMove<CrmCard>) {
		this.scrollArea.nativeElement.scrollLeft += event.delta.x * 10;
	}
}
