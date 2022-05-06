import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PostsListService } from '../state/posts-list.service';
import { PostsListQuery } from '../state/posts-list.query';
import { Post } from '../../../classes';
import { MatSort, Sort } from '@angular/material/sort';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;
  displayedColumns: string[] = ['id', 'title', 'body'];
  rowData: TableVirtualScrollDataSource<Post> =
    new TableVirtualScrollDataSource<Post>([]);

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly _postsListService: PostsListService,
    private readonly _postsLisQuery: PostsListQuery
  ) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  ngAfterViewInit(): void {
    this.rowData.sort = this.sort;
    this.onRowSort();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  quickSearch(key: string) {
    //TODO
  }

  private onRowSort(): void {
    this.rowData.sort?.sortChange.subscribe((sort: Sort) => {
      console.log(sort);
    });
  }

  private getAllPosts(): void {
    this._postsListService.getAll().pipe(takeUntil(this.destroy$)).subscribe();
    this._postsLisQuery
      .selectAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((rows) => {
        this.rowData = new TableVirtualScrollDataSource(rows);
      });
  }
}
