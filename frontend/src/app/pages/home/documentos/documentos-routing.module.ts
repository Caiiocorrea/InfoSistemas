import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocEntradasComponent } from './doc-entradas/doc-entradas.component';
import { DocSaidasComponent } from './doc-saidas/doc-saidas.component';
import { DocumentosComponent } from './documentos.component';
import { RelatorioEntradaComponent } from './relatorio-entrada/relatorio-entrada.component';

const routes: Routes = [
	{ path: '', component: DocEntradasComponent, data: { title: 'Documentos' } },
	{
		path: 'documentos-entrada',
		component: DocEntradasComponent,
		data: { title: 'Doc. Entrada' }
	},
	{
		path: 'documentos-relatorios',
		component: RelatorioEntradaComponent,
		data: { title: 'Relatorios' }
	},
	{
		path: 'documentos-saida',
		component: DocSaidasComponent,
		data: { title: 'Doc. Saída' }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DocumentosRoutingModule {}
