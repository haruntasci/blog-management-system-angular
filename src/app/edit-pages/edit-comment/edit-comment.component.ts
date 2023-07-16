import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/interfaces/Comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit, OnDestroy {

  private commentSubscription: Subscription | undefined;

  form: FormGroup;
  comment: Comment;

  constructor(
    private service: CommentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.comment = {
      comment: '',
      commentId: 0,
      creationDate: '',
      isConfirmed: false,
      postId: 0,
      userId: 0
    };
    this.form = new FormGroup({
      comment: new FormControl('', [Validators.required]),
      isConfirmed: new FormControl<boolean>(false, [Validators.required])
    });
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.params['id']);
    this.commentSubscription = this.service.getCommentById(id).subscribe(data => {
      this.comment = data;
      this.form.patchValue({
        comment: this.comment.comment,
        isConfirmed: this.comment.isConfirmed
      });
    });
  }

  ngOnDestroy(): void {
    if (this.commentSubscription) {
      this.commentSubscription.unsubscribe();
    }
  }

  submit() {
    if (this.form.valid) {
      this.comment = { ...this.comment, ...this.form.value };
      this.service.editComment(this.comment.commentId, this.comment);
      this.router.navigate(['/comments']);
    }
  }
}