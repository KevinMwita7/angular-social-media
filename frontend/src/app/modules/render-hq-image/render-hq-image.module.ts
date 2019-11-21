import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderHqImageComponent } from 'src/app/components/render-hq-image/render-hq-image.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    RenderHqImageComponent,
  ],
  entryComponents:[RenderHqImageComponent],
  exports: [RenderHqImageComponent]
})
export class RenderHqImageModule { }
