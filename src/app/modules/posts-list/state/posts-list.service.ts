import { Injectable } from '@angular/core';
import { IPostListSort, PostsListStore } from './posts-list.store';
import { map, Observable, tap } from 'rxjs';
import { IPost, Post } from '../../../classes';
import { HttpService } from '../../../http.service';
import { assertProperties } from '../../../utils/utils';

const POST_PROPS = ['userId', 'id', 'title', 'body'];

@Injectable({ providedIn: 'root' })
export class PostsListService {
  constructor(
    protected store: PostsListStore,
    private readonly _http: HttpService
  ) {}

  getAll(): Observable<unknown> {
    return this._http.get('/posts').pipe(
      tap((posts) =>
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
    return this._http.get(`/posts/${postId}`);
  }

  create(post: Post): Observable<unknown> {
    return this._http.post(`/posts`, post);
  }

  delete(postId: string): Observable<unknown> {
    return this._http.delete(`/posts/${postId}`);
  }

  saveFilterValue(filterQuery: string): void {
    this.store.update({ filter: filterQuery });
  }

  saveSortValue(sortQuery: IPostListSort): void {
    this.store.update({ sort: sortQuery });
  }
}