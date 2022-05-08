import { CommentDialogComponent } from './post-dialog.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EMPTY, of } from 'rxjs';
import { CommentsListQuery } from '../../state/comments-list.query';
import { CommentsListService } from '../../state/comments-list.service';
import { CommentsListStore } from '../../state/comments-list.store';

const mockCommentValue = {
  postId: 2,
  id: 2,
  name: 'b',
  email: 'b',
  body: 'b ',
};

describe('CommentDialogComponent', () => {
  let spectator: Spectator<CommentDialogComponent>;
  let commentsListQuery: CommentsListQuery;
  let commentsListService: CommentsListService;
  let commentListStore: CommentsListStore;
  let dialogRef: MatDialogRef<CommentDialogComponent>;

  const createComponent = createComponentFactory({
    component: CommentDialogComponent,
    mocks: [CommentsListQuery, CommentsListService, MatDialogRef],
    providers: [
      {
        provide: CommentsListService,
        useValue: { getOne: jest.fn().mockReturnValue(of(EMPTY)) },
      },
    ],
    imports: [
      MatDialogModule,
      MatInputModule,
      MatFormFieldModule,
      FormsModule,
      ReactiveFormsModule,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    commentsListQuery = spectator.inject(CommentsListQuery);
    commentsListService = spectator.inject(CommentsListService);
    commentListStore = spectator.inject(CommentsListStore);
    dialogRef = spectator.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should not get data from db when postId data is not provided', () => {
    const getOneSpy = jest.spyOn(commentsListService, 'getOne');

    spectator.component.ngOnInit();

    expect(getOneSpy).not.toHaveBeenCalled();
  });
});

describe('CommentDialogComponent with provided data', () => {
  let spectator: Spectator<CommentDialogComponent>;
  let commentsListQuery: CommentsListQuery;
  let commentsListService: CommentsListService;
  let commentListStore: CommentsListStore;

  const createComponentWithData = createComponentFactory({
    component: CommentDialogComponent,
    mocks: [CommentsListStore, MatDialogRef],
    providers: [
      {
        provide: CommentsListService,
        useValue: { getOne: jest.fn().mockReturnValue(of(EMPTY)) },
      },
      {
        provide: CommentsListQuery,
        useValue: { select: jest.fn().mockReturnValue(of(mockCommentValue)) },
      },
      {
        provide: MAT_DIALOG_DATA,
        useValue: { commentId: 1 },
      },
    ],
    imports: [
      MatDialogModule,
      MatInputModule,
      MatFormFieldModule,
      FormsModule,
      ReactiveFormsModule,
    ],
  });

  beforeEach(() => {
    spectator = createComponentWithData();
    commentsListQuery = spectator.inject(CommentsListQuery);
    commentsListService = spectator.inject(CommentsListService);
    commentListStore = spectator.inject(CommentsListStore);
  });

  it('should  get data from db when postId is not provided', () => {
    const getOneSpy = jest.spyOn(commentsListService, 'getOne');

    spectator.component.ngOnInit();

    expect(getOneSpy).toHaveBeenCalled();
  });

  it('should update form values after getting data from db', () => {
    const nameControl = spectator.component.form.controls['nameControl'];
    const bodyControl = spectator.component.form.controls['bodyControl'];
    const emailControl = spectator.component.form.controls['emailControl'];

    spectator.component.ngOnInit();

    expect(nameControl.value).toEqual(mockCommentValue.name);
    expect(bodyControl.value).toEqual(mockCommentValue.body);
    expect(emailControl.value).toEqual(mockCommentValue.email);
  });
});
describe('CommentDialogComponent with provided data', () => {
  let spectator: Spectator<CommentDialogComponent>;
  let commentsListQuery: CommentsListQuery;
  let commentsListService: CommentsListService;
  let commentListStore: CommentsListStore;

  const createComponentWithData = createComponentFactory({
    component: CommentDialogComponent,
    mocks: [CommentsListStore, MatDialogRef],
    providers: [
      {
        provide: CommentsListService,
        useValue: { getOne: jest.fn().mockReturnValue(of(EMPTY)) },
      },
      {
        provide: CommentsListQuery,
        useValue: { select: jest.fn().mockReturnValue(of(mockCommentValue)) },
      },
      {
        provide: MAT_DIALOG_DATA,
        useValue: { commentId: 1 },
      },
    ],
    imports: [
      MatDialogModule,
      MatInputModule,
      MatFormFieldModule,
      FormsModule,
      ReactiveFormsModule,
    ],
  });

  beforeEach(() => {
    spectator = createComponentWithData();
    commentsListQuery = spectator.inject(CommentsListQuery);
    commentsListService = spectator.inject(CommentsListService);
    commentListStore = spectator.inject(CommentsListStore);
  });

  it('should  get data from db when postId is not provided', () => {
    const getOneSpy = jest.spyOn(commentsListService, 'getOne');

    spectator.component.ngOnInit();

    expect(getOneSpy).toHaveBeenCalled();
  });

  it('should update form values after getting data from db', () => {
    const nameControl = spectator.component.form.controls['nameControl'];
    const bodyControl = spectator.component.form.controls['bodyControl'];
    const emailControl = spectator.component.form.controls['emailControl'];

    spectator.component.ngOnInit();

    expect(nameControl.value).toEqual(mockCommentValue.name);
    expect(bodyControl.value).toEqual(mockCommentValue.body);
    expect(emailControl.value).toEqual(mockCommentValue.email);
  });
});
