import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  private postSubscription: Subscription | undefined;

  form: FormGroup;
  post: Post;

  constructor(
    private service: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      viewCount: new FormControl('', [Validators.required]),
      isPublished: new FormControl<boolean>(false, [Validators.required])
    });
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.params['id']);
    this.postSubscription = this.service.getPostById(id).subscribe(data => {
      this.post = data;
      this.form.patchValue({
        title: this.post.title,
        content: this.post.content,
        viewCount: this.post.viewCount,
        isPublished: this.post.isPublished
      });
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  submit() {
    if (this.form.valid) {
      this.post = { ...this.post, ...this.form.value };
      this.service.editPost(this.post.postId, this.post);
      this.router.navigate(['/posts']);
    }
  }
}