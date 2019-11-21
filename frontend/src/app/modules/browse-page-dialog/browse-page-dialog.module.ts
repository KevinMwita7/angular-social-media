import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowsePageDialogComponent } from 'src/app/components/browse-page-dialog/browse-page-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BrowsePageDialogComponent],
  entryComponents: [BrowsePageDialogComponent],
  exports: [BrowsePageDialogComponent]
})
export class BrowsePageDialogModule { }
