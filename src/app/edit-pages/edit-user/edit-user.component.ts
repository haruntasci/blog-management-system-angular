import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription | undefined;

  user: User;
  form: FormGroup;
  id: number = 0;

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.user = { userId: 0, email: '', isActive: false, username: '', creationDate: '' };

    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      isActive: new FormControl<boolean>(false, [Validators.required]),
      email: new FormControl('', [Validators.required])
    });

  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.userSubscription = this.service.getUserById(this.id).subscribe(data => {
      this.user = data;
      this.form.patchValue({
        username: this.user.username,
        isActive: this.user.isActive,
        email: this.user.email
      });
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  submit() {
    if (this.form.valid) {
      this.user = { ...this.user, ...this.form.value };
      this.service.editUser(this.user.userId, this.user);
      this.router.navigate(['/users']);
    }
  }
}