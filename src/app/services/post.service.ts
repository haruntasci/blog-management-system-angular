import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { Post } from '../interfaces/Post';
import { PostsData } from '../data/post-data';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[] = PostsData;
  post: Post;

  constructor() {
    this.post = {
      postId: 0,
      userId: 0,
      categoryId: 0,
      title: '',
      content: '',
      viewCount: 0,
      creationDate: '',
      isPublished: false
    };
  }

  // Add Post - Create
  addPost(post: Post) {
    this.posts.push(post);
  }

  // Get Posts - Read
  getPosts(): Observable<Post[]> {
    return of(this.posts);
  }

  // Get Post by Id - Read
  getPostById(id: number): Observable<Post> {
    this.post = this.posts.filter(data => data.postId === id)[0];
    return of(this.post);
  }
  // Get Posts by UserId and CategoryId - Read
  getPostsByUserIdAndCategoryId(userId: number, categoryId: number): Observable<Post[]> {
    return of(this.posts.filter(data => data.userId === userId && data.categoryId === categoryId));
  }

  // Get Posts by UserId - Read
  getPostsByUserId(userId: number): Observable<Post[]> {
    return of(this.posts.filter(data => data.userId === userId));
  }

  // Get Posts by CategoryId - Read
  getPostsByCategoryId(categoryId: number): Observable<Post[]> {
    return of(this.posts.filter(data => data.categoryId === categoryId));
  }

  editPost(id: number, post1: any): void {
    const userIndex = this.posts.findIndex(post => post.postId === id);
    if (userIndex !== -1) {
      this.posts[userIndex] = post1;
      console.log(this.posts[userIndex]);
    }
  }
  // Delete Post - Delete
  deletePost(id: number) {
    const itemIndex = this.posts.findIndex(data => data.postId === id);
    if (itemIndex != -1)
      this.posts.splice(itemIndex, 1);
  }

}