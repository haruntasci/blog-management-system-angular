import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTableList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faTableList = faTableList;


  @Input() columnHeadingArray: any[] = [];
  @Input() gridData: any[] | undefined;
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 0;
  @Input() totalPage: number = 0;

  @Output() detailsCallback = new EventEmitter<any>();
  @Output() editCallback = new EventEmitter<any>();
  @Output() deleteCallback = new EventEmitter<any>();

  @Output() nextPageCallback = new EventEmitter<void>();
  @Output() previousPageCallback = new EventEmitter<void>();
  @Output() lastPageCallback = new EventEmitter<void>();


  onDetails(data: any) {
    this.detailsCallback.emit(data);
  }

  onEdit(data: any) {
    this.editCallback.emit(data);
  }

  onDelete(data: any) {
    this.deleteCallback.emit(data);
  }

  handleNextPage() {
    this.nextPageCallback.emit();
  }

  handlePreviousPage() {
    this.previousPageCallback.emit();
  }

  handleLastPage() {
    this.lastPageCallback.emit();
  }

}