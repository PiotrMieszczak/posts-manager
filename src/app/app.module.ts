import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './layout/header/header.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommentsListModule } from './modules/comments-list/comments-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    AkitaNgDevtools.forRoot(),
    MatSnackBarModule,
    CommentsListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
