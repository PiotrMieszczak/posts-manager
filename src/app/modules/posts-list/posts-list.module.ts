import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PostsListRoutingModule } from './posts-list-routing.module';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, PostsListRoutingModule],
  exports: [ListComponent],
})
export class PostsListModule {}
