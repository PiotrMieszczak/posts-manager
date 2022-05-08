import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { Comment, Post } from '../../../../classes';
import {
  combineLatest,
  debounceTime,
  EMPTY,
  filter,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CommentsListService } from '../../state/comments-list.service';
import { CommentsListQuery } from '../../state/comments-list.query';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;
  displayedColumns: string[] = ['id', 'name', 'email', 'body', 'actions'];
  rowData: TableVirtualScrollDataSource<Comment> =
    new TableVirtualScrollDataSource<Comment>([]);
  quickSearch: FormGroup;

  viewedPost$: Observable<Post | null> = of(null);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly _commentsListService: CommentsListService,
    private readonly _commentsLisQuery: CommentsListQuery,
    private readonly _fb: FormBuilder,
    private readonly _dialog: MatDialog,
    private readonly _cdRef: ChangeDetectorRef,
    private readonly _router: ActivatedRoute
  ) {
    this.quickSearch = this.buildForm();
    this.startRouterSub();
  }

  ngOnInit(): void {
    this.rowData.sort = this.sort;
    this.startSearchSubscribe();
    this.getViewedPost();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addComment(): void {
    // TODO
  }

  editComment(comment: Comment): void {
    // TODO
  }

  deleteComment(comment: Comment): void {
    // TODO
  }

  private buildForm(): FormGroup {
    return this._fb.group({
      searchControl: [''],
    });
  }

  private startRouterSub(): void {
    this._router.paramMap
      .pipe(
        map((paramMap) => paramMap.get('id')),
        filter(Boolean)
      )
      .subscribe((postId) => {
        this.getAllComments(postId);
      });
  }

  private getAllComments(postId: string): void {
    this._commentsListService
      .getAll(postId)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
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
      startWith(this._commentsLisQuery.getValue().sort),
      takeUntil(this.destroy$)
    );
    if (!searchQuery$) {
      return;
    }

    combineLatest([sortQuery$, searchQuery$])
      .pipe(
        switchMap(([sort, query]: any) => {
          return this._commentsLisQuery
            .selectAll({
              filterBy: (entity: Comment) =>
                !!entity.body
                  ?.toLocaleLowerCase()
                  .includes(query.toLocaleLowerCase()) ||
                !!entity.email
                  ?.toLocaleLowerCase()
                  .includes(query.toLocaleLowerCase()) ||
                !!entity.name
                  ?.toLocaleLowerCase()
                  .includes(query.toLocaleLowerCase()),
            })
            .pipe(
              map((comments: Comment[]) =>
                this._commentsListService.sortBy(comments, sort)
              )
            );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((rows) => {
        console.log(rows);
        this.rowData = new TableVirtualScrollDataSource(rows);
        this._cdRef.markForCheck();
      });
  }

  getViewedPost(): void {
    this.viewedPost$ = this._commentsLisQuery.select('viewedPost');
  }
}
