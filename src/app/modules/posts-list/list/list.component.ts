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
import {
  debounceTime,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  throttleTime,
} from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;
  displayedColumns: string[] = ['id', 'title', 'body', 'actions'];
  rowData: TableVirtualScrollDataSource<Post> =
    new TableVirtualScrollDataSource<Post>([]);

  quickSearch: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly _postsListService: PostsListService,
    private readonly _postsLisQuery: PostsListQuery,
    private readonly _fb: FormBuilder
  ) {
    this.quickSearch = this.buildForm();
  }

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

  addNewPost(): void {}

  editPost(post: Post): void {}

  deletePost(post: Post): void {}

  private onRowSort(): void {
    this.rowData.sort?.sortChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((sort: Sort) => {
        this._postsListService.saveSortValue(sort);
      });
  }

  private getAllPosts(): void {
    this._postsListService.getAll().pipe(takeUntil(this.destroy$)).subscribe();
    this.startSearchSubscribe();
  }

  private buildForm(): FormGroup {
    return this._fb.group({
      searchControl: [''],
    });
  }

  private startSearchSubscribe(): void {
    const searchQuery$ = this.quickSearch
      .get('searchControl')
      ?.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        takeUntil(this.destroy$)
      );
    if (!searchQuery$) {
      return;
    }
    searchQuery$
      .pipe(
        switchMap((query: string) => {
          return this._postsLisQuery.selectAll({
            filterBy: [
              (entity: Post) =>
                !!entity.title?.includes(query.toLocaleLowerCase()),
              (entity: Post) =>
                !!entity.body?.includes(query.toLocaleLowerCase()),
            ],
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((rows) => {
        this.rowData = new TableVirtualScrollDataSource(rows);
      });
  }
}
