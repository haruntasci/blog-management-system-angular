import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  @Input() dialogHeading: string = '';
  @Input() dialogBody: string = '';

  @Output() deleteConfirmCallback = new EventEmitter<any>();
  @Output() closeConfirmCallback = new EventEmitter<any>();

  onDelete() {
    this.deleteConfirmCallback.emit();
  }
  onClose() {
    this.closeConfirmCallback.emit();
  }

}