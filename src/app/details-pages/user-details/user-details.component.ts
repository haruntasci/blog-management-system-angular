import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  private usersSubscription: Subscription | undefined;

  user: User;

  constructor(private service: UserService, private route: ActivatedRoute,) {
    this.user = { userId: 0, username: '', email: '', creationDate: '', isActive: false };
  }
  ngOnInit(): void {
    let id = Number(this.route.snapshot.params['id']);
    this.usersSubscription = this.service.getUserById(id).subscribe(data => {
      this.user = data;
    });
  }
  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}