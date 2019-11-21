import { NgModule } from '@angular/core';
import { CommentsInputBoxComponent } from './comments-input-box.component';
import { MatButtonModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, CommonModule],
    exports: [CommentsInputBoxComponent],
    declarations: [CommentsInputBoxComponent]
})

export class CommentsInputBoxModule { }