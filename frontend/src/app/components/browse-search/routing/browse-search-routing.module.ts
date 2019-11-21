import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseSearchComponent } from '../browse-search.component';

const routes: Routes = [
  {path: '', component: BrowseSearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrowseSearchRoutingModule { }
