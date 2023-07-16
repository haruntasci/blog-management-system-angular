import { NgModule } from '@angular/core';
import { TruncatePipe } from './truncate/truncate.pipe';



@NgModule({
  declarations: [
    TruncatePipe
  ],
  imports: [],
  exports: [
    TruncatePipe
  ]
}) export class PipesModule { }