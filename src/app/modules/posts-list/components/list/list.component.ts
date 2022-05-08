import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PostsListService } from '../state/posts-list.service';
import { PostsListQuery } from '../state/posts-list.query';
import { Post } from '../../../../classes';
import { MatSort, Sort } from '@angular/material/sort';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import {
  debounceTime,
  filter,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../../dialogs/post-dialog/post-dialog.component';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

const BASE_DIALOG_CONFIG = {
  minWidth: '30vw',
  minHeight: 'fit-content',
  disableClose: true,
};

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
    private readonly _fb: FormBuilder,
    private readonly _dialog: MatDialog
  ) {
    this.quickSearch = this.buildForm();
  }

  ngOnInit(): void {
    this.getAllPosts();
    this.startSearchSubscribe();
  }

  ngAfterViewInit(): void {
    this.rowData.sort = this.sort;
    this.onRowSort();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addNewPost(): void {
    const dialogRef = this._dialog.open(PostDialogComponent, {
      ...BASE_DIALOG_CONFIG,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((res) => !!res),
        switchMap((post: Post) => {
          return this._postsListService.create(post);
        })
      )
      .subscribe(() => {
        this.getAllPosts();
      });
  }

  editPost(post: Post): void {
    const dialogRef = this._dialog.open(PostDialogComponent, {
      ...BASE_DIALOG_CONFIG,
      data: { postId: post.id },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((res) => !!res),
        switchMap((post: Post) => {
          return this._postsListService.update(post);
        })
      )
      .subscribe(() => {
        this.getAllPosts();
      });
  }

  deletePost(post: Post): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      ...BASE_DIALOG_CONFIG,
      data: 'Do you want to delete post?',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => {
          return this._postsListService.delete(post);
        })
      )
      .subscribe(() => {
        this.getAllPosts();
      });
  }

  private onRowSort(): void {
    this.rowData.sort?.sortChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((sort: Sort) => {
        console.log(sort);
        this._postsListService.saveSortValue(sort);
      });
  }

  private getAllPosts(): void {
    this._postsListService.getAll().pipe(takeUntil(this.destroy$)).subscribe();
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
