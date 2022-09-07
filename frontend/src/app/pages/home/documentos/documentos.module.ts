import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { DocumentosRoutingModule } from './documentos-routing.module';
import { DocumentosComponent } from './documentos.component';
import { DocEntradasComponent } from './doc-entradas/doc-entradas.component';

import { ModalCadastraNFComponent } from './doc-entradas/modal-cadastra-nf/modal-cadastra-nf.component';
import { RelatorioEntradaComponent } from './relatorio-entrada/relatorio-entrada.component';
import { ModalComentariosComponent } from './doc-entradas/modal-comentarios/modal-comentarios.component';
import { ModalFranquiaComponent } from './doc-entradas/modal-franquia/modal-franquia.component';
import { ModalInformacaoComponent } from './doc-entradas/modal-informacao/modal-informacao.component';
import { DocSaidasComponent } from './doc-saidas/doc-saidas.component';
import { ModalInformacaoSaidasComponent } from './doc-saidas/modal-informacao-saidas/modal-informacao-saidas.component';
import { AssocTransportadoraComponent } from './doc-saidas/assoc-transportadora/assoc-transportadora.component';
import { ModalRomaneioComponent } from './doc-saidas/modal-romaneio/modal-romaneio.component';

import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
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
import { ComponentsModule } from 'src/app/components/components.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';

const maskConfigFunction: () => Partial<IConfig> = () => {
	return {
		validation: true
	};
};

@NgModule({
	declarations: [
		DocumentosComponent,
		DocEntradasComponent,
		RelatorioEntradaComponent,
		ModalComentariosComponent,
		ModalFranquiaComponent,
		ModalCadastraNFComponent,
		ModalInformacaoComponent,
		DocSaidasComponent,
		ModalInformacaoSaidasComponent,
		AssocTransportadoraComponent,
		ModalRomaneioComponent
	],
	imports: [
		ComponentsModule,
		CommonModule,
		DocumentosRoutingModule,
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
		MatStepperModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		MatAutocompleteModule,
		MatDividerModule,
		NgxMaskModule.forRoot(maskConfigFunction),
		MatChipsModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatTooltipModule
	]
})
export class DocumentosModule {}
