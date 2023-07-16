import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { UserData } from '../data/user-data';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = UserData;
  user: User;

  constructor() {
    this.user = { userId: 0, email: '', isActive: false, username: '', creationDate: '' };
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUserById(id: number): Observable<User> {
    this.user = this.users.filter(data => data.userId === id)[0];
    return of(this.user);
  }

  editUser(id: number, user1: User): void {
    const userIndex = this.users.findIndex(user => user.userId === id);
    if (userIndex !== -1) {
      this.users[userIndex] = user1;
      console.log(this.users[userIndex]);
    }
  }

  deleteUser(userId: number): void {
    const itemIndex = this.users.findIndex(user => user.userId === userId);
    if (itemIndex != -1)
      this.users.splice(itemIndex, 1);
  }
}