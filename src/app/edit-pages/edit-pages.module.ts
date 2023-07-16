import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditUserComponent,
    EditPostComponent,
    EditCommentComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EditPagesModule { }
