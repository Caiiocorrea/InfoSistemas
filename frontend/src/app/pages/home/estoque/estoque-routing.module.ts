import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstoqueComponent } from './estoque.component';

const routes: Routes = [
	{ path: '', component: EstoqueComponent, data: { title: 'Estoque' } }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EstoqueRoutingModule {}