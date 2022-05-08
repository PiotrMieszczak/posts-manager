import { Injectable } from '@angular/core';
import { CommentsListStore } from './comments-list.store';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { assertProperties } from '../../../utils/utils';
import { IComment, Comment } from '../../../classes';
import { Sort } from '@angular/material/sort';
import { PostsListService } from '../../posts-list/components/state/posts-list.service';

const COMMENT_PROPS = ['postId', 'id', 'name', 'email', 'body'];

@Injectable({ providedIn: 'root' })
export class CommentsListService {
  constructor(
    protected store: CommentsListStore,
    private readonly _http: HttpService,
    private readonly _snackBar: MatSnackBar,
    private readonly _postListService: PostsListService
  ) {}

  getAll(postId: string): Observable<unknown> {
    return this._http.get(`/posts/${postId}/comments`).pipe(
      filter((comments) =>
        comments.every((comments: Record<string, unknown>) =>
          assertProperties(COMMENT_PROPS, comments)
        )
      ),
      map((comments: IComment[]) =>
        this.store.add(comments.map((comment) => new Comment(comment)))
      ),
      switchMap((comments) => {
        return this._postListService.getOne(postId).pipe(
          map((post) => {
            this.store.update({
              viewedPost: post,
            });
            return comments;
          })
        );
      })
    );
  }

  getOne(postId: string): Observable<unknown> {
    return this._http.get(`/posts/${postId}`).pipe(
      filter((comment) => assertProperties(COMMENT_PROPS, comment)),
      map((comment: IComment) =>
        this.store.update({ editedPost: new Comment(comment) })
      )
    );
  }

  create(comment: Omit<Comment, 'id'>): Observable<unknown> {
    return this._http
      .post(`/comments`, comment)
      .pipe(tap(() => this.openSnackBar('Create')));
  }

  delete(comment: Comment): Observable<unknown> {
    return this._http
      .delete(`/comments/${comment.id}`)
      .pipe(tap(() => this.openSnackBar('Delete')));
  }

  update(comment: Comment): Observable<unknown> {
    return this._http
      .patch(`/comments/${comment.id}`, comment)
      .pipe(tap(() => this.openSnackBar('Update')));
  }

  sortBy(data: Comment[], sort: Sort): Comment[] {
    if (sort.active === 'body') {
      return data.sort((a, b) => {
        if (!a.body || !b.body) return 0;
        return sort.direction === 'desc'
          ? b.body.localeCompare(a.body)
          : a.body.localeCompare(b.body);
      });
    }

    if (sort.active === 'email') {
      return data.sort((a, b) => {
        if (!a.email || !b.email) return 0;
        return sort.direction === 'desc'
          ? b.email.localeCompare(a.email)
          : a.email.localeCompare(b.email);
      });
    }

    if (sort.active === 'name') {
      return data.sort((a, b) => {
        if (!a.name || !b.name) return 0;
        return sort.direction === 'desc'
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      });
    }

    return data.sort((a, b) => {
      if (!a.id || !b.id) return 0;
      return sort.direction === 'desc' ? b.id - a.id : a.id - b.id;
    });
  }

  private openSnackBar(actionType: string): void {
    this._snackBar.open(`${actionType} action successful`, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
