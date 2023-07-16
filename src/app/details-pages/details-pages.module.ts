import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details/post-details.component';
import { CommentDetailsComponent } from './comment-details/comment-details.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    PostDetailsComponent,
    CommentDetailsComponent,
    CategoryDetailsComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class DetailsPagesModule { }