import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/interfaces/Comment';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/interfaces/Post';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  comment: Comment;

  constructor(private commentService: CommentService, private postService: PostService, private userService: UserService, private route: ActivatedRoute) {
    this.comment = { commentId: 0, postId: 0, userId: 0, comment: '', creationDate: '', isConfirmed: false };
  }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.params['id']);
    this.subscriptions.push(this.commentService.getCommentById(id).subscribe(data => {
      this.comment = data;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getUsername(id: number) {
    let username;
    this.subscriptions.push(this.userService.getUserById(id).subscribe(data => username = data.username));
    return username;
  }
  getPostTitle(id: number) {
    let postTitle;
    this.subscriptions.push(this.postService.getPostById(id).subscribe(data => {
      postTitle = data.title;
    }))
    return postTitle;
  }
}