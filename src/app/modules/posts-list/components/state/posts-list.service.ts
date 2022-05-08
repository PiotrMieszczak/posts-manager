import { Injectable } from '@angular/core';
import { IPostListSort, PostsListStore } from './posts-list.store';
import { filter, map, Observable, tap } from 'rxjs';
import { IPost, Post } from '../../../../classes';
import { HttpService } from '../../../../http.service';
import { assertProperties } from '../../../../utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

const POST_PROPS = ['userId', 'id', 'title', 'body'];

@Injectable({ providedIn: 'root' })
export class PostsListService {
  constructor(
    protected store: PostsListStore,
    private readonly _http: HttpService,
    private readonly _snackBar: MatSnackBar
  ) {}

  getAll(): Observable<unknown> {
    return this._http.get('/posts').pipe(
      filter((posts) =>
        posts.every((post: Record<string, unknown>) =>
          assertProperties(POST_PROPS, post)
        )
      ),
      map((posts: IPost[]) =>
        this.store.add(posts.map((post) => new Post(post)))
      )
    );
  }

  getOne(postId: string): Observable<unknown> {
    return this._http.get(`/posts/${postId}`).pipe(
      filter((post) => assertProperties(POST_PROPS, post)),
      map((post: IPost) => this.store.update({ editedPost: new Post(post) }))
    );
  }

  create(post: Pick<Post, 'title' | 'body'>): Observable<unknown> {
    return this._http
      .post(`/posts`, post)
      .pipe(tap(() => this.openSnackBar('Create')));
  }

  delete(post: Post): Observable<unknown> {
    return this._http
      .delete(`/posts/${post.id}`)
      .pipe(tap(() => this.openSnackBar('Delete')));
  }

  update(post: Post): Observable<unknown> {
    return this._http
      .patch(`/posts/${post.id}`, post)
      .pipe(tap(() => this.openSnackBar('Update')));
  }

  saveFilterValue(filterQuery: string): void {
    this.store.update({ filter: filterQuery });
  }

  saveSortValue(sortQuery: IPostListSort): void {
    this.store.update({ sort: sortQuery });
  }

  private openSnackBar(actionType: string): void {
    this._snackBar.open(`${actionType} action successful`, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
