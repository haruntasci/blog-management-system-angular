import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDetailsComponent } from './comment-details.component';

describe('CommentDetailsComponent', () => {
  let component: CommentDetailsComponent;
  let fixture: ComponentFixture<CommentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentDetailsComponent]
    });
    fixture = TestBed.createComponent(CommentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
