import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {


  @Input() routingName: string = '';
  @Input() buttonName: string = '';

  constructor(private router: Router) { }

  add() {
    this.router.navigate([this.routingName]);
  }

}