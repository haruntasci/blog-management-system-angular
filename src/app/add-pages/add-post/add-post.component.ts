import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/Post';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  form: FormGroup;
  posts: any[] = [];
  users: any[] = [];
  categories: any[] = [];
  value: string = '';

  constructor(
    private postService: PostService,
    private userService: UserService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.form = new FormGroup({
      userId: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      viewCount: new FormControl('', Validators.required),
      creationDate: new FormControl('', Validators.required),
      isPublished: new FormControl(false, Validators.required)
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
      this.categoryService.getCategories().subscribe(data2 => {
        this.categories = data2;
      })
    );
    this.subscriptions.push(
      this.postService.getPosts().subscribe(data => {
        this.posts = data;
      })
    );
  }

  getUniqueId(): number {
    const commentIds: number[] = this.posts.map(post => post.postId);
    const maxId = Math.max(...commentIds);
    return maxId + 1;
  }


  submit() {
    if (this.form.valid) {
      const post: Post = {
        postId: this.getUniqueId(),
        userId: +this.form.value.userId,
        categoryId: +this.form.value.categoryId,
        title: this.form.value.title,
        content: this.form.value.content,
        viewCount: +this.form.value.viewCount,
        creationDate: this.form.value.creationDate,
        isPublished: Boolean(this.form.value.isPublished)
      };
      this.postService.addPost(post);
      this.router.navigate(['/posts']);
    }
  }
}
