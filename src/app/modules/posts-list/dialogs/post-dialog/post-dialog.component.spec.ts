import { PostDialogComponent } from './post-dialog.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsListQuery } from '../../components/state/posts-list.query';
import { PostsListService } from '../../components/state/posts-list.service';
import { PostsListStore } from '../../components/state/posts-list.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EMPTY, of } from 'rxjs';

const mockPostValue = {
  title: 'title',
  body: 'body',
  userId: 1,
  id: 1,
};

describe('PostDialogComponent', () => {
  let spectator: Spectator<PostDialogComponent>;
  let postListQuery: PostsListQuery;
  let postsListService: PostsListService;
  let postsListStore: PostsListStore;
  let dialogRef: MatDialogRef<PostDialogComponent>;

  const createComponent = createComponentFactory({
    component: PostDialogComponent,
    mocks: [PostsListQuery, PostsListStore, MatDialogRef],
    providers: [
      {
        provide: PostsListService,
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
    postListQuery = spectator.inject(PostsListQuery);
    postsListService = spectator.inject(PostsListService);
    postsListStore = spectator.inject(PostsListStore);
    dialogRef = spectator.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should not get data from db when postId data is not provided', () => {
    const getOneSpy = jest.spyOn(postsListService, 'getOne');

    spectator.component.ngOnInit();

    expect(getOneSpy).not.toHaveBeenCalled();
  });
});

describe('PostDialogComponent with provided data', () => {
  let spectator: Spectator<PostDialogComponent>;
  let postListQuery: PostsListQuery;
  let postsListService: PostsListService;
  let postsListStore: PostsListStore;
  let dialogRef: MatDialogRef<PostDialogComponent>;

  const createComponentWithData = createComponentFactory({
    component: PostDialogComponent,
    mocks: [PostsListStore, MatDialogRef],
    providers: [
      {
        provide: PostsListService,
        useValue: { getOne: jest.fn().mockReturnValue(of(EMPTY)) },
      },
      {
        provide: PostsListQuery,
        useValue: { select: jest.fn().mockReturnValue(of(mockPostValue)) },
      },
      {
        provide: MAT_DIALOG_DATA,
        useValue: { postId: 1 },
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
    postListQuery = spectator.inject(PostsListQuery);
    postsListService = spectator.inject(PostsListService);
    postsListStore = spectator.inject(PostsListStore);
  });

  it('should  get data from db when postId is not provided', () => {
    const getOneSpy = jest.spyOn(postsListService, 'getOne');

    spectator.component.ngOnInit();

    expect(getOneSpy).toHaveBeenCalled();
  });

  it('should update form values after getting data from db', () => {
    const titleControl = spectator.component.form.controls['titleControl'];
    const bodyControl = spectator.component.form.controls['bodyControl'];

    spectator.component.ngOnInit();

    expect(titleControl.value).toEqual(mockPostValue.title);
    expect(bodyControl.value).toEqual(mockPostValue.body);
  });
});
