import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPostComponent } from './add-post/add-post.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { AddCategoryComponent } from './add-category/add-category.component';




@NgModule({
  declarations: [
    AddUserComponent,
    AddPostComponent,
    AddCommentComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AddPagesModule { }