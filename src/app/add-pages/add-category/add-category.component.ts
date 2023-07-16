import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  private categoriesSubscription: Subscription | undefined;

  form: FormGroup;
  categories: any[] = [];

  constructor(
    private service: CategoryService,
    private router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      creationDate: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.service.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  getUniqueId(): number {
    const categoryIds: number[] = this.categories.map(category => category.categoryId);
    const maxId = Math.max(...categoryIds);
    return maxId + 1;
  }

  submit() {
    if (this.form.valid) {
      const category: Category = {
        categoryId: this.getUniqueId(),
        name: this.form.value.name,
        creationDate: this.form.value.creationDate
      };
      this.service.addcategory(category);
      this.router.navigate(['/categories']);
    }
  }

}