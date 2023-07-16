import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
declare var window: any

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  deleteConfirmValue: any;
  isDeleted: boolean = false;
  type: string = '';
  alertTitle: string = '';
  value: string = '';
  userId: number = 0;
  users: any[] = [];
  posts: any[] = [];
  filteredPosts: any[] = [];
  filteredComments: any[] = [];
  comments: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPage: number = 1;
  parentData: number = 0;
  visibility: boolean = true;
  formModal: any;
  columnArray: any[] = [
    { fieldName: 'userId', text: 'User Id' },
    { fieldName: 'username', text: 'Username' },
    { fieldName: 'email', text: 'Email' },
    { fieldName: 'creationDate', text: 'Creation Date' },
    { fieldName: 'isActive', text: 'Is Active' }
  ];


  constructor(
    private service: UserService,
    private postService: PostService,
    private commentService: CommentService,
    private router: Router,
  ) {
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
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadData(): void {
    this.subscriptions.push(
      this.service.getUsers().subscribe(data => {
        this.users = data;
        this.calculateTotalPage(this.users.length);
      })
    );

    this.subscriptions.push(
      this.postService.getPosts().subscribe(data => {
        this.posts = data;
      })
    );

    this.subscriptions.push(
      this.commentService.getComments().subscribe(data => {
        this.comments = data;
      })
    );
  }

  calculateTotalPage(dataLength: number): void {
    this.totalPage = Math.floor(dataLength / this.pageSize)
    if (dataLength % this.pageSize) {
      this.totalPage++;
    }
  }

  makeItInvisible(): void {
    setTimeout(() => {
      this.visibility = true;
      this.isDeleted = false;
    }, 3000);
  }

  details(item: any): void {
    this.router.navigate(['users/details', item.userId]);
  }

  deleteConfirm(): void {
    this.deleteProcess(this.deleteConfirmValue.userId);
    this.closeModel();
  }

  delete(item: any): void {
    this.openModel();
    this.deleteConfirmValue = item;
  }

  deleteProcess(id: number): void {

    this.visibility = false;
    this.filteredPosts = this.posts.filter(x => x.userId === id);
    this.filteredComments = this.comments.filter(x => x.userId === id);


    if (this.users.length === 1) {
      this.type = "alert alert-danger";
      this.alertTitle = "Error";
      this.value = "You cannot delete if there is only one user left";
    }
    else if (this.filteredPosts.length >= 1) {
      this.type = "alert alert-danger";
      this.alertTitle = "Error";
      this.value = "You cannot delete the user if the user has a post";
    }
    else if (this.filteredComments.length >= 1) {
      this.type = "alert alert-danger";
      this.alertTitle = "Error";
      this.value = "You cannot delete the user if the user has a comment";
    }
    else {
      this.service.deleteUser(id)
      this.type = "alert alert-success";
      this.isDeleted = true;
      this.value = "Deletion successful";
      this.alertTitle = "Success";
      this.calculateTotalPage(this.users.length);
    }
    this.makeItInvisible();
  }


  edit(item: any): void {
    this.router.navigate(['users/edit', item.userId]);
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


}