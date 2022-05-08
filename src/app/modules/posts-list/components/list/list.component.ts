import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PostsListService } from '../state/posts-list.service';
import { PostsListQuery } from '../state/posts-list.query';
import { Post } from '../../../../classes';
import { MatSort } from '@angular/material/sort';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import {
  combineLatest,
  debounceTime,
  filter,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../../dialogs/post-dialog/post-dialog.component';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

const BASE_DIALOG_CONFIG = {
  minWidth: '30vw',
  minHeight: 'fit-content',
  disableClose: true,
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;
  displayedColumns: string[] = ['id', 'title', 'body', 'actions'];
  rowData: TableVirtualScrollDataSource<Post> =
    new TableVirtualScrollDataSource<Post>([]);

  quickSearch: FormGroup;
  activeElement: Post | undefined = undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly _postsListService: PostsListService,
    private readonly _postsLisQuery: PostsListQuery,
    private readonly _fb: FormBuilder,
    private readonly _dialog: MatDialog,
    private readonly _cdRef: ChangeDetectorRef,
    private readonly _router: Router
  ) {
    this.quickSearch = this.buildForm();
  }

  ngOnInit(): void {
    this.getAllPosts();
    this.rowData.sort = this.sort;
    this.startSearchSubscribe();
    this.getActiveElement();
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

  showComments(post: Post): void {
    this._postsListService.setActive(post);
    this._router.navigate(['comments', post.id]);
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

    const sortQuery$ = this.rowData.sort?.sortChange.pipe(
      startWith(this._postsLisQuery.getValue().sort),
      takeUntil(this.destroy$)
    );
    if (!searchQuery$) {
      return;
    }

    combineLatest([sortQuery$, searchQuery$])
      .pipe(
        switchMap(([sort, query]: any) => {
          return this._postsLisQuery
            .selectAll({
              filterBy: (entity: Post) =>
                !!entity.title
                  ?.toLocaleLowerCase()
                  .includes(query.toLocaleLowerCase()) ||
                !!entity.body
                  ?.toLocaleLowerCase()
                  .includes(query.toLocaleLowerCase()),
            })
            .pipe(
              map((posts: Post[]) => this._postsListService.sortBy(posts, sort))
            );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((rows) => {
        this.rowData = new TableVirtualScrollDataSource(rows);
        this._cdRef.markForCheck();
      });
  }

  private getActiveElement(): void {
    this._postsLisQuery
      .selectActive()
      .pipe(takeUntil(this.destroy$))
      .subscribe((post) => {
        this.activeElement = post;
      });
  }
}
