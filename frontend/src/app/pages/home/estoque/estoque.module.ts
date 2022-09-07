import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { ComponentsModule } from 'src/app/components/components.module';
import { EstoqueRoutingModule } from './estoque-routing.module';
import { EstoqueComponent } from './estoque.component';

import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ModalAssociadosComponent } from './modal-associados/modal-associados.component';
import { MapaComponent } from './mapa/mapa.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
	return {
		validation: true
	};
};

@NgModule({
	declarations: [EstoqueComponent, ModalAssociadosComponent, MapaComponent],
	imports: [
		ComponentsModule,
		CommonModule,
		EstoqueRoutingModule,
		MatExpansionModule,
		MatInputModule,
		FormsModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatTableModule,
		MatMenuModule,
		MatDialogModule,
		MatSnackBarModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		NgxMaskModule.forRoot(maskConfigFunction),
		MatChipsModule,
		MatDatepickerModule,
		MatNativeDateModule
	]
})
export class EstoqueModule {}
