import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { RegisterService } from 'src/app/services/http/register.service';
import { ModalCadastraUsuarioComponent } from './modal-cadastra-usuario/modal-cadastra-usuario.component';
import { ModalEditaUsuarioComponent } from './modal-edita-usuario/modal-edita-usuario.component';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
	constructor(
		private registerService: RegisterService,
		private matDialog: MatDialog,
		private snackbar: MatSnackBar,
		private breakpointObserver: BreakpointObserver
	) {}

	_form = new FormGroup({
		NomeCompleto: new FormControl(''),
		inativo: new FormControl(false)
	});

	displayedColumns: string[] = [
		'Notify',
		'NomeCompleto',
		'Cargo',
		'Telefone',
		'Email',
		'CD',
		'Controls'
	];

	FabOptions = {
		buttons: ['person_add']
	};

	_dataSource!: MatTableDataSource<any>;
	pageCount!: number;
	currentPage: number = 1;
	rowsPage: number = 20;
	totalRegisters: number = 0;

	breakPoint: boolean = false;
	isLoading: boolean = true;

	ngOnInit(): void {
		this.getUsers(1);

		this.breakpointObserver
			.observe(['(max-width: 900px)'])
			.subscribe((state: BreakpointState) => {
				if (state.matches) {
					this.breakPoint = true;
				} else {
					this.breakPoint = false;
				}
			});
	}

	getUsers(pageNumber: number) {
		this.isLoading = true;

		this.registerService.getUser(1, 20, true).subscribe(
			(success: any) => {
				this.isLoading = false;
				this._dataSource = new MatTableDataSource(success);
			},
			error => {
				this.snackbar.open('Ocorreu um erro', 'Fechar');
			}
		);
	}

	getUserFilter() {}

	toggleInactive(event: MatSlideToggleChange) {}

	registerUser() {
		const dialogRef = this.matDialog.open(ModalCadastraUsuarioComponent, {
			panelClass: 'modal-default',
			autoFocus: false
		});
	}

	editUser(element: any) {
		const dialogRef = this.matDialog.open(ModalEditaUsuarioComponent, {
			autoFocus: false,
			panelClass: 'modal-edit',
			data: {
				element
			}
		});
	}

	deleteUser(value: any, idUser: any) {
		const dialogRef = this.matDialog.open(ErrorMessageComponent, {
			panelClass: 'modal-erroMessage',
			autoFocus: false,
			data: {
				Title: 'Confirma exclusão de cadastro?',
				Message: 'Você solicitou a exclusão do seguinte usuario:',
				Value: value || '',
				Confirm: 'Tem certeza que deseja excluir este cadastro?'
			}
		});

		dialogRef.afterClosed().subscribe(response => {
			if (response) {
			}
		});
	}

	getFuncFAB(idFunc: Number) {
		switch (idFunc) {
			case 1:
				this.registerUser();
				break;
			default:
				console.log('erro');
		}
	}
}
