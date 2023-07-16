import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
declare var window: any;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  private commentServiceSubscription: Subscription | undefined;
  private routeSubscription: Subscription | undefined;

  deleteConfirmValue: any;
  isDeleted: boolean = false;
  type: string = '';
  alertTitle: string = '';
  value: string = '';
  postId: number = 0;
  userId: number = 0;
  categoryId: number = 0;
  queryPostId: number = 0;
  queryUserId: number = 0;
  queryCategoryId: number = 0;
  posts: any[] = [];
  comments: any[] = [];
  filteredComments: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPage: number = 1;
  visibility: boolean = true;
  formModal: any;
  columnArray: any[] = [
    { fieldName: 'postId', text: 'Post Id' },
    { fieldName: 'userId', text: 'User Id' },
    { fieldName: 'categoryId', text: 'Category Id' },
    { fieldName: 'title', text: 'Title' },
    { fieldName: 'viewCount', text: 'View Count' },
    { fieldName: 'creationDate', text: 'Creation Date' },
    { fieldName: 'isPublished', text: 'Is Published' }
  ];



  constructor(
    private service: PostService,
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  openModel(): void {
    this.formModal.show();
  }

  closeModel(): void {
    this.formModal.hide();
  }

  ngOnInit(): void {

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.commentServiceSubscription = this.commentService.getComments().subscribe(data => {
      this.comments = data;
    });

    this.routeSubscription = this.route.queryParamMap.subscribe((param) => {
      this.queryPostId = Number(param.get('postId'));
      this.queryUserId = Number(param.get('userId'));
      this.queryCategoryId = Number(param.get('categoryId'));
      this.postId = this.queryPostId;
      this.userId = this.queryUserId;
      this.categoryId = this.queryCategoryId;

      this.service.getPosts().subscribe(data => {
        this.posts = data;
      });

      if (this.queryPostId > 0) {
        this.posts = this.posts.filter(data => data.postId === this.queryPostId);
        this.calculateTotalPage(this.posts.length);
      }
      else if (this.queryUserId > 0 && this.queryCategoryId > 0) {
        this.posts = this.posts.filter(data => data.userId === this.queryUserId && data.categoryId === this.queryCategoryId);
        this.calculateTotalPage(this.posts.length);
      }
      else if (this.queryUserId > 0) {
        this.posts = this.posts.filter(data => data.userId === this.queryUserId);
        this.calculateTotalPage(this.posts.length);
      }
      else if (this.queryCategoryId > 0) {
        this.posts = this.posts.filter(data => data.categoryId === this.queryCategoryId);
        this.calculateTotalPage(this.posts.length);
      }
      else {
        this.service.getPosts().subscribe(data => {
          this.posts = data;
          this.calculateTotalPage(this.posts.length);
        })
      }
    })

  }

  ngOnDestroy(): void {
    if (this.commentServiceSubscription) {
      this.commentServiceSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  applyFilters(): void {
    this.appendQueryParam();
  }

  calculateTotalPage(dataLength: number): void {
    this.totalPage = Math.floor(dataLength / this.pageSize);
    if (dataLength % this.pageSize) {
      this.totalPage++;
    }
    this.pageIndex = 0;
  }


  makeItInvisible(): void {
    setTimeout(() => {
      this.visibility = true;
      this.isDeleted = false;
    }, 3000)
  }

  deleteConfirm(): void {
    this.deleteProcess(this.deleteConfirmValue.postId);
    this.closeModel();
  }

  delete(item: any): void {
    this.openModel();
    this.deleteConfirmValue = item;
  }
  deleteProcess(id: number): void {

    this.visibility = false;
    this.filteredComments = this.comments.filter(data => data.postId === id);

    if (this.filteredComments.length >= 1) {

      this.type = "alert alert-danger";
      this.alertTitle = "Error";
      this.value = "You cannot delete a post with a comment";
    }
    else {
      this.service.deletePost(id);
      this.isDeleted = true;
      this.value = "Deletion successful";
      this.alertTitle = "Success";
      this.type = "alert alert-success";
      this.calculateTotalPage(this.posts.length);
    }
    this.makeItInvisible();
  }

  edit(item: any): void {
    this.router.navigate(['posts/edit', item.postId]);
  }

  details(item: any): void {
    this.router.navigate(['posts/details', item.postId]);
  }

  handlePreviousPageButton(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
    }
  }

  handleNextPageButton(): void {
    if (this.pageIndex < this.totalPage - 1) {
      this.pageIndex++;
    }
  }
  handleLastPageButton(): void {
    this.pageIndex = this.totalPage - 1;
  }


  appendQueryParam(): void {
    if (this.postId > 0) {
      this.router.navigate(['/posts'], { queryParams: { postId: this.postId } });
    }
    else if (this.userId > 0 && this.categoryId > 0) {
      this.router.navigate(['/posts'], { queryParams: { userId: this.userId, categoryId: this.categoryId } });
    }
    else if (this.userId > 0) {
      this.router.navigate(['/posts'], { queryParams: { userId: this.userId } });
    }
    else if (this.categoryId > 0) {
      this.router.navigate(['/posts'], { queryParams: { categoryId: this.categoryId } });
    }
    else {
      this.router.navigate(['/posts']);
    }
  }

}