import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {

  private usersSubscription: Subscription | undefined;

  form: FormGroup;
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      isActive: new FormControl(false, [Validators.required]),
      creationDate: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.usersSubscription = this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

  getUniqueId(): number {
    const userIds: number[] = this.users.map(user => user.userId);
    const maxId = Math.max(...userIds);
    return maxId + 1;
  }

  submit(): void {
    if (this.form.valid) {
      const user: User = {
        userId: this.getUniqueId(),
        username: this.form.value.username,
        email: this.form.value.email,
        creationDate: this.form.value.creationDate,
        isActive: Boolean(this.form.value.isActive)
      };

      this.userService.addUser(user);
      this.router.navigate(['/users']);
    }
  }

}