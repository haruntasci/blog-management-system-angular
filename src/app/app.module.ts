import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListPagesModule } from './list-pages/list-pages.module';
import { EditPagesModule } from './edit-pages/edit-pages.module';
import { AddPagesModule } from './add-pages/add-pages.module';
import { DetailsPagesModule } from './details-pages/details-pages.module';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    ListPagesModule,
    AddPagesModule,
    EditPagesModule,
    DetailsPagesModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }