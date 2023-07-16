import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Category } from "../interfaces/Category";
import { CategoriesData } from "../data/category-data";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = CategoriesData;
  category: Category;

  constructor() {
    this.category = { categoryId: 0, creationDate: '', name: '' };
  }

  // Add Category - Create
  addcategory(category: Category) {
    this.categories.push(category);
  }

  // Get Categories - Read
  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  // Get Category by Id - Read
  getCategoryById(id: number): Observable<Category> {
    this.category = this.categories.filter(data => data.categoryId === id)[0];
    return of(this.category);
  }

  editCategory(id: number, category1: any): void {
    const userIndex = this.categories.findIndex(category => category.categoryId === id);
    if (userIndex !== -1) {
      this.categories[userIndex] = category1;
    }
  }
  // Delete Category - Delete
  deleteCategory(id: number) {
    const itemIndex = this.categories.findIndex(data => data.categoryId === id);
    if (itemIndex != -1)
      this.categories.splice(itemIndex, 1);
  }

}