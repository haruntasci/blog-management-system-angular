import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { AlertBoxComponent } from '../components/alert-box/alert-box.component';
import { ButtonComponent } from '../components/button/button.component';
import { TableComponent } from '../components/table/table.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { PostListComponent } from './post-list/post-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations:
    [
      UserListComponent,
      CategoryListComponent,
      AlertBoxComponent,
      ButtonComponent,
      TableComponent,
      ConfirmDialogComponent,
      PostListComponent,
      CommentListComponent

    ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    FontAwesomeModule
  ]
})
export class ListPagesModule { }