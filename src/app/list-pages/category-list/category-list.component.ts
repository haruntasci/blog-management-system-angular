import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
declare var window: any

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  categoryId: number = 0;
  deleteConfirmValue: any;
  isDeleted: boolean = false;
  type: string = '';
  alertTitle: string = '';
  value: string = '';
  visibility: boolean = true;
  categories: any[] = [];
  posts: any[] = [];
  filteredPosts: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPage: number = 1;
  formModal: any;
  columnArray: any[] = [
    { fieldName: 'categoryId', text: 'Category Id' },
    { fieldName: 'name', text: 'Categori Name' },
    { fieldName: 'creationDate', text: 'Creation Date' }
  ];

  constructor(
    private service: CategoryService,
    private postService: PostService,
    private router: Router
  ) { }

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
      this.service.getCategories().subscribe(data => {
        this.categories = data;
        this.calculateTotalPage(this.categories.length);
      })
    );
    this.subscriptions.push(
      this.postService.getPosts().subscribe(data => {
        this.posts = data;
      })
    );
  }

  calculateTotalPage(dataLength: number): void {
    this.totalPage = Math.floor(dataLength / this.pageSize);
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

  deleteConfirm(): void {
    this.deleteProcess(this.deleteConfirmValue.categoryId);
    this.closeModel();
  }

  delete(item: any): void {
    this.openModel();
    this.deleteConfirmValue = item;
  }

  deleteProcess(id: number): void {

    this.visibility = false;
    this.filteredPosts = this.posts.filter(x => x.categoryId === id);

    if (this.filteredPosts!.length >= 1) {
      this.type = "alert alert-danger";
      this.alertTitle = "Error";
      this.value = "If a post contains this category, you cannot delete it.";
    }
    else {
      this.service.deleteCategory(id);
      this.type = "alert alert-success";
      this.isDeleted = true;
      this.value = "Deletion successful";
      this.alertTitle = "Success";
    }

    this.makeItInvisible();

  }

  edit(item: any): void {
    this.router.navigate(['categories/edit', item.categoryId]);
  }
  details(item: any): void {
    this.router.navigate(['categories/details', item.categoryId]);
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