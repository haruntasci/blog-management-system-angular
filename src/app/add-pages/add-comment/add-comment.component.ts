import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/interfaces/Comment';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  form: FormGroup;
  comments: any[] = [];
  users: any[] = [];
  posts: any[] = [];
  value: string = '';

  constructor(
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private router: Router
  ) {
    this.form = new FormGroup({
      postId: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      creationDate: new FormControl('', [Validators.required]),
      isConfirmed: new FormControl<boolean>(false, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadData(): void {
    this.subscriptions.push(
      this.userService.getUsers().subscribe(data1 => {
        this.users = data1;
      })
    );
    this.subscriptions.push(
      this.postService.getPosts().subscribe(data2 => {
        this.posts = data2;
      })
    );
    this.subscriptions.push(
      this.commentService.getComments().subscribe(data => {
        this.comments = data
      })
    );
  }

  getUniqueId(): number {
    const commentIds: number[] = this.comments.map(comment => comment.commentId);
    const maxId = Math.max(...commentIds);
    return maxId + 1;
  }

  submit() {
    if (this.form.valid) {
      const comment: Comment = {
        commentId: this.getUniqueId(),
        postId: +this.form.value.postId,
        userId: +this.form.value.userId,
        comment: this.form.value.comment,
        creationDate: this.form.value.creationDate,
        isConfirmed: Boolean(this.form.value.isConfirmed)
      };
      this.commentService.addComment(comment);
      this.router.navigate(['/comments']);
    }
  }

}