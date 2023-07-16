import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
declare var window: any

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})

export class CommentListComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription | undefined;
  private commentServiceSubscription: Subscription | undefined;

  deleteConfirmValue: any;
  isDeleted: boolean = false;
  type: string = '';
  alertTitle: string = '';
  value: string = '';
  visibility: boolean = true;
  comments: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPage: number = 1;
  queryPostId: number = 0;
  postId: number = 0;
  formModal: any;
  columnArray: any[] = [
    { fieldName: 'commentId', text: 'Comment Id' },
    { fieldName: 'userId', text: 'User Id' },
    { fieldName: 'postId', text: 'Post Id' },
    { fieldName: 'comment', text: 'Comment' },
    { fieldName: 'isConfirmed', text: 'Is Confirmed' }
  ];


  constructor(
    private service: CommentService,
    private router: Router,
    private route: ActivatedRoute) { }

  openModel(): void {
    this.formModal.show();
  }
  closeModel(): void {
    this.formModal.hide();
  }
  applyFilters(): void {
    this.appendQueryParam();
  }

  ngOnInit(): void {

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );

    this.routeSubscription = this.route.queryParamMap.subscribe((param) => {
      this.queryPostId = Number(param.get('postId'));
      this.postId = this.queryPostId;

      if (this.queryPostId > 0) {
        this.commentServiceSubscription = this.service.getComments().subscribe(data => {
          this.comments = data;
          this.comments = this.comments.filter(comment => comment.postId === this.queryPostId);
          this.calculateTotalPage(this.comments.length);
        });
      }
      else {
        this.commentServiceSubscription = this.service.getComments().subscribe(data => {
          this.comments = data;
          this.calculateTotalPage(this.comments.length);
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.commentServiceSubscription?.unsubscribe();
  }

  calculateTotalPage(dataLength: number): void {
    this.totalPage = Math.floor(dataLength / this.pageSize);
    if (dataLength % this.pageSize) {
      this.totalPage++;
    }
    this.pageIndex = 0;
  }
  deleteConfirm(): void {
    this.deleteProcess(this.deleteConfirmValue.commentId);
    this.closeModel();
  }

  delete(item: any): void {
    this.openModel();
    this.deleteConfirmValue = item;
  }

  deleteProcess(id: number): void {
    this.visibility = false;
    this.service.deleteComment(id);
    this.isDeleted = true;
    this.value = "Deletion successful";
    this.alertTitle = "Success";
    this.type = "alert alert-success";
    this.calculateTotalPage(this.comments.length);
    this.makeItInvisible();
  }

  makeItInvisible(): void {
    setTimeout(() => {
      this.visibility = true;
      this.isDeleted = false;
    }, 3000);
  }

  edit(item: any): void {
    this.router.navigate(['comments/edit', item.commentId]);
  }

  details(item: any): void {
    this.router.navigate(['comments/details', item.commentId]);
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
      this.router.navigate(['/comments'], { queryParams: { postId: this.postId } });
    }
    else {
      this.router.navigate(['/comments']);
    }
  }
}