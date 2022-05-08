import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentsListComponent } from './comments-list.component';
import { CommentsListQuery } from '../../state/comments-list.query';
import { CommentsListService } from '../../state/comments-list.service';
import { CommentsListStore } from '../../state/comments-list.store';
import { CommentsListModule } from '../../comments-list.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CommentDialogComponent } from '../../dialogs/comment-dialog/post-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { of } from 'rxjs';

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

const mockPostData = [
  {
    postId: 1,
    id: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantiumquam ',
  },
  {
    postId: 2,
    id: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantiumquam ',
  },
  {
    postId: 2,
    id: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantiumquam ',
  },
];

describe('CommentsListComponent', () => {
  let spectator: Spectator<CommentsListComponent>;
  let commentsListQuery: CommentsListQuery;
  let commentsListService: CommentsListService;
  let commentsListStore: CommentsListStore;

  const createComponent = createComponentFactory({
    component: CommentsListComponent,
    providers: [CommentsListQuery, CommentsListService, CommentsListStore],
    imports: [CommentsListModule, HttpClientTestingModule, RouterTestingModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    commentsListQuery = spectator.inject(CommentsListQuery);
    commentsListService = spectator.inject(CommentsListService);
    commentsListStore = spectator.inject(CommentsListStore);
  });

  it('should create', () => {
    expect(spectator.component).toBeDefined();
  });

  describe('Quick Search', () => {
    it('should filter rows by search query', () => {
      spectator.component.ngOnInit();
      commentsListStore.add(mockPostData);

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
  let spectator: Spectator<CommentsListComponent>;
  let commentsListService: CommentsListService;
  let matDialog: MatDialog;

  const createComponent = createComponentFactory({
    component: CommentsListComponent,
    mocks: [MatDialogRef, CommentDialogComponent],
    providers: [
      CommentsListQuery,
      CommentsListService,
      CommentsListStore,
      {
        provide: MatDialog,
        useClass: MockAddDialogComponent,
      },
    ],
    imports: [CommentsListModule, HttpClientTestingModule, RouterTestingModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    commentsListService = spectator.inject(CommentsListService);
    matDialog = spectator.inject(MatDialog);
  });

  it('should invoke create method from CommentsListService', () => {
    spectator.component.postId = '1';
    const dialogSpy = jest.spyOn(commentsListService, 'create');

    spectator.component.addComment();

    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(mockPostData[0]);
  });

  it('should invoke create update from CommentsListService', () => {
    spectator.component.postId = '1';
    const dialogSpy = jest.spyOn(commentsListService, 'update');

    spectator.component.editComment(mockPostData[0]);

    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(mockPostData[0]);
  });

  it('should invoke delete update from CommentsListService', () => {
    spectator.component.postId = '1';
    const dialogSpy = jest.spyOn(commentsListService, 'delete');

    spectator.component.deleteComment(mockPostData[0]);

    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(mockPostData[0]);
  });
});
