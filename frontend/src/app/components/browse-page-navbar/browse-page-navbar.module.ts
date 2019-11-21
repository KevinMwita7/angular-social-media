import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowsePageNavbarComponent } from './browse-page-navbar.component';
import { BrowsePageDialogModule } from 'src/app/modules/browse-page-dialog/browse-page-dialog.module';

@NgModule({
imports: [RouterModule, CommonModule, FormsModule, BrowsePageDialogModule],
exports: [BrowsePageNavbarComponent],
declarations: [BrowsePageNavbarComponent]
})

export class BrowsePageNavbarModule {}
