import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  category: Category;
  posts: any[] = [];
  count: number = 0;

  constructor(private service: CategoryService, private postService: PostService, private router: Router, private route: ActivatedRoute) {
    this.category = { categoryId: 0, creationDate: '', name: '' };
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.params['id']);
    this.subscriptions.push(this.service.getCategoryById(id).subscribe(data => {
      this.category = data;
    }))
    this.subscriptions.push(this.postService.getPostsByCategoryId(id).subscribe(data => {
      this.posts = data;
      this.count = this.posts?.length;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  navigateToPosts() {
    this.router.navigate(['/posts'], { queryParams: { categoryId: this.category.categoryId } });
  }
}