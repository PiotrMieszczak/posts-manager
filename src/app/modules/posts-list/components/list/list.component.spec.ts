import { ListComponent } from './list.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PostsListService } from '../state/posts-list.service';
import { PostsListQuery } from '../state/posts-list.query';
import { PostsListModule } from '../../posts-list.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsListStore } from '../state/posts-list.store';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommentDialogComponent } from '../../../comments-list/dialogs/comment-dialog/post-dialog.component';
import { Component } from '@angular/core';
import { of } from 'rxjs';

const mockPostData = [
  {
    userId: 1,
    id: 1,
    title: 'title 1',
    body: 'body 1',
  },
  {
    userId: 2,
    id: 2,
    title: 'title 2',
    body: 'body 2',
  },
  {
    userId: 3,
    id: 3,
    title: 'title 3',
    body: 'body 3',
  },
  {
    userId: 4,
    id: 4,
    title: 'title 4',
    body: 'body 4',
  },
];

@Component({
  selector: 'app-mock',
  template: '<div>MockDialog</div>',
})
class MockAddDialogComponent {
  open() {
    return {
      afterClosed: () => of(mockPostData[0]),
    };
  }
}

describe('ListComponent', () => {
  let spectator: Spectator<ListComponent>;
  let postListQuery: PostsListQuery;
  let postsListService: PostsListService;
  let postsListStore: PostsListStore;

  const createComponent = createComponentFactory({
    component: ListComponent,
    providers: [PostsListQuery, PostsListService, PostsListStore],
    imports: [PostsListModule, HttpClientTestingModule, RouterTestingModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    postListQuery = spectator.inject(PostsListQuery);
    postsListService = spectator.inject(PostsListService);
    postsListStore = spectator.inject(PostsListStore);
  });

  it('should create', () => {
    expect(spectator.component).toBeDefined();
  });

  describe('Quick Search', () => {
    it('should filter rows by search query', () => {
      spectator.component.ngOnInit();
      postsListStore.add(mockPostData);

      spectator.detectChanges();

      // @ts-ignore
      const input = spectator.component.quickSearch.controls.searchControl;
      input.setValue('title 4');

      input.valueChanges.subscribe(() => {
        expect(spectator.component.rowData).toHaveLength(1);
      });
    });
  });
});

describe('CommentsListComponent Dialog interactions', () => {
  let spectator: Spectator<ListComponent>;
  let postListQuery: PostsListQuery;
  let postsListService: PostsListService;
  let postsListStore: PostsListStore;
  let matDialog: MatDialog;

  const createComponent = createComponentFactory({
    component: ListComponent,
    mocks: [MatDialogRef, CommentDialogComponent],
    providers: [
      PostsListQuery,
      PostsListService,
      PostsListStore,
      {
        provide: MatDialog,
        useClass: MockAddDialogComponent,
      },
    ],
    imports: [PostsListModule, HttpClientTestingModule, RouterTestingModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    postListQuery = spectator.inject(PostsListQuery);
    postsListService = spectator.inject(PostsListService);
    postsListStore = spectator.inject(PostsListStore);
    matDialog = spectator.inject(MatDialog);
  });

  it('should invoke create method from PostsListService', () => {
    const dialogSpy = jest.spyOn(postsListService, 'create');
    const getAllSpy = jest.spyOn(postsListService, 'getAll');

    spectator.component.addNewPost();

    expect(dialogSpy).toHaveBeenCalled();
    expect(getAllSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(mockPostData[0]);
  });

  it('should invoke create update from PostsListService', () => {
    const dialogSpy = jest.spyOn(postsListService, 'update');
    const getAllSpy = jest.spyOn(postsListService, 'getAll');

    spectator.component.editPost(mockPostData[0]);

    expect(dialogSpy).toHaveBeenCalled();
    expect(getAllSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(mockPostData[0]);
  });

  it('should invoke delete update from PostsListService', () => {
    const dialogSpy = jest.spyOn(postsListService, 'delete');
    const getAllSpy = jest.spyOn(postsListService, 'getAll');

    spectator.component.deletePost(mockPostData[0]);

    expect(dialogSpy).toHaveBeenCalled();
    expect(getAllSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(mockPostData[0]);
  });
});
