import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { Comment } from '../interfaces/Comment';
import { CommentsData } from '../data/comment-data';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: Comment[] = CommentsData;
  comment: Comment;

  constructor() {
    this.comment = {
      comment: '',
      commentId: 0,
      creationDate: '',
      isConfirmed: false,
      postId: 0,
      userId: 0
    };
  }

  // Add Comment - Create
  addComment(comment: Comment) {
    this.comments.push(comment);
  }

  // Get Comments - Read
  getComments(): Observable<Comment[]> {
    return of(this.comments);
  }

  // Get Comment by Id - Read
  getCommentById(id: number): Observable<Comment> {
    return of(this.comments.filter(data => data.commentId === id)[0]);
  }

  // Get Comments - Read
  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return of(this.comments.filter(data => data.postId === postId));
  }

  // Update Comment - Update
  editComment(id: number, comment1: any): void {
    const userIndex = this.comments.findIndex(comment => comment.commentId === id);
    if (userIndex !== -1) {
      this.comments[userIndex] = comment1;
      console.log(this.comments[userIndex]);
    }
  }

  // Delete Comment - Delete
  deleteComment(id: number) {
    const itemIndex = this.comments.findIndex(data => data.commentId === id);
    if (itemIndex != -1)
      this.comments.splice(itemIndex, 1);
  }
}