import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DocumentsService } from 'src/app/services/http/documents.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-modal-cadastra-nf',
	templateUrl: './modal-cadastra-nf.component.html',
	styleUrls: ['./modal-cadastra-nf.component.scss']
})
export class ModalCadastraNFComponent implements OnInit {
	separatorKeysCodes: number[] = [ENTER, COMMA];

	dealers: any = [];
	sugestDealers: any[] = [];
	dealderDatabase: any[] = [];

	@ViewChild('dealersInput') dealersInput!: ElementRef<HTMLInputElement>;

	constructor(
		private documentService: DocumentsService,
		private matSnack: MatSnackBar
	) {}

	ngOnInit(): void {
		this.documentService.getProvide().subscribe(
			(success: any) => {
				this.dealderDatabase = success;
			},
			error => {
				this.matSnack.open(
					'Não foi possivel carregar os fornecedores',
					'Fechar',
					{ duration: 3000 }
				);
			}
		);
	}

	add(dealer: MatChipInputEvent) {}

	getDealers(value: Event) {
		let search = (value.target as HTMLInputElement).value;
		let index = this.dealderDatabase.filter((dealer: any) =>
			dealer.NomeFornecedor.startsWith(search)
		);

		if (index) {
			this.sugestDealers = index;
		}
	}

	addFornList(dealer: MatAutocompleteSelectedEvent) {
		this.dealers.push(dealer.option.value);
		this.sugestDealers = this.dealderDatabase;
		this.dealersInput.nativeElement.value = '';
	}

	removeFornList(dealer: any) {
		const index = this.dealers.indexOf(dealer);

		if (index >= 0) {
			this.dealers.splice(index, 1);
		}
	}
}
