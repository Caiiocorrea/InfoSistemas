import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RotasComponent } from './rotas.component';

const routes: Routes = [{ path: '', component: RotasComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RotasRoutingModule {}
