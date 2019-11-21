import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderUploadedPostComponent } from './render-uploaded-images.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [RenderUploadedPostComponent],
    declarations: [RenderUploadedPostComponent]
})

export class RenderUploadedImagesModule { }
