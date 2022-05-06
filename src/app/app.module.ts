import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './layout/header/header.module';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { SidenavModule } from './layout/sidenav/sidenav.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { APP_BASE_HREF } from '@angular/common';
import { ListComponent } from './modules/posts-list/list/list.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    SidenavModule,
    MatSidenavModule,
    AkitaNgDevtools.forRoot(),
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
