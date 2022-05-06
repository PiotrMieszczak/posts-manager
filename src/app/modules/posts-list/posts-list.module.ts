import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PostsListRoutingModule } from './posts-list-routing.module';
import { MatTableModule } from '@angular/material/table';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    PostsListRoutingModule,
    MatTableModule,
    TableVirtualScrollModule,
    ScrollingModule,
    MatFormFieldModule,
    MatSortModule,
  ],
  exports: [ListComponent],
})
export class PostsListModule {}
