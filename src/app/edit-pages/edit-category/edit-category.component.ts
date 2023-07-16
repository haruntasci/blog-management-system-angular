import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  private categorySubscription: Subscription | undefined;

  form: FormGroup;
  category: Category;

  constructor(
    private service: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.category = {
      categoryId: 0,
      name: '',
      creationDate: ''
    };
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.categorySubscription = this.service.getCategoryById(id).subscribe(data => {
      this.category = data;
      this.form.patchValue({
        name: this.category.name
      });
    });
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  submit() {
    if (this.form.valid) {
      this.category = { ...this.category, ...this.form.value };
      this.service.editCategory(this.category.categoryId, this.category);
      this.router.navigate(['/categories']);
    }
  }
}