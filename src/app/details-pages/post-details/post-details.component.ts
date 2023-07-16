import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interfaces/Post';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  post: Post;
  comments: any[] | undefined;
  faEye = faEye;

  constructor(
    private service: PostService,
    private commentService: CommentService,
    private userService: UserService,
    private categoryService: CategoryService,
    private route: ActivatedRoute) {

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

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.params['id']);
    this.subscriptions.push(
      this.service.getPostById(id).subscribe(data => {
        this.post = data;
      })
    );
    this.subscriptions.push(this.commentService
      .getCommentsByPostId(id)
      .subscribe(data => {
        this.comments = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getUsername(id: number) {
    let username;
    this.subscriptions.push(this.userService.getUserById(id).subscribe(data => username = data.username));
    return username;
  }
  getCategoryname(id: number) {
    let categoryname;
    this.subscriptions.push(this.categoryService.getCategoryById(id).subscribe(data => categoryname = data.name));
    return categoryname;
  }
}