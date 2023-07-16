import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { ButtonComponent } from './components/button/button.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/table/table.component';
import { PipesModule } from "./pipes/pipes.module";


@NgModule({
  declarations: [
    AppComponent,
    AlertBoxComponent,
    ButtonComponent,
    ConfirmDialogComponent,
    NavbarComponent,
    TableComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PipesModule
  ]
})
export class AppModule { }
