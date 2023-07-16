import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './list-pages/user-list/user-list.component';
import { EditUserComponent } from './edit-pages/edit-user/edit-user.component';
import { AddUserComponent } from './add-pages/add-user/add-user.component';
import { CategoryListComponent } from './list-pages/category-list/category-list.component';
import { PostListComponent } from './list-pages/post-list/post-list.component';
import { CommentListComponent } from './list-pages/comment-list/comment-list.component';
import { PostDetailsComponent } from './details-pages/post-details/post-details.component';
import { CommentDetailsComponent } from './details-pages/comment-details/comment-details.component';
import { CategoryDetailsComponent } from './details-pages/category-details/category-details.component';
import { AddPostComponent } from './add-pages/add-post/add-post.component';
import { AddCommentComponent } from './add-pages/add-comment/add-comment.component';
import { AddCategoryComponent } from './add-pages/add-category/add-category.component';
import { EditPostComponent } from './edit-pages/edit-post/edit-post.component';
import { EditCategoryComponent } from './edit-pages/edit-category/edit-category.component';
import { EditCommentComponent } from './edit-pages/edit-comment/edit-comment.component';
import { UserDetailsComponent } from './details-pages/user-details/user-details.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: AddUserComponent },
  { path: 'users/edit/:id', component: EditUserComponent },
  { path: 'users/details/:id', component: UserDetailsComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/add', component: AddCategoryComponent },
  { path: 'categories/edit/:id', component: EditCategoryComponent },
  { path: 'categories/details/:id', component: CategoryDetailsComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/add', component: AddPostComponent },
  { path: 'posts/edit/:id', component: EditPostComponent },
  { path: 'posts/details/:id', component: PostDetailsComponent },
  { path: 'comments', component: CommentListComponent },
  { path: 'comments/add', component: AddCommentComponent },
  { path: 'comments/edit/:id', component: EditCommentComponent },
  { path: 'comments/details/:id', component: CommentDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }