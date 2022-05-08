import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../../../environments/environment';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { PostsListService } from './posts-list.service';
import { PostsListStore } from './posts-list.store';
import { PostsListModule } from '../../posts-list.module';

const mockPostData = [
  {
    userId: 1,
    id: 1,
    title: 'adopt',
    body: 'asses',
  },
  {
    userId: 1,
    id: 2,
    title: 'trial',
    body: 'hold',
  },
];

const invalidData = [
  { ...mockPostData[0], body: null, title: null, id: null },
  { ...mockPostData[1], body: null, title: null, id: null },
];

describe('GetData', () => {
  let spectator: SpectatorService<PostsListService>;
  let postsListService: PostsListService;
  let postsListStore: PostsListStore;
  let httpController: HttpTestingController;

  const createService = createServiceFactory({
    service: PostsListService,
    providers: [PostsListStore],
    imports: [PostsListModule, HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    postsListService = spectator.inject(PostsListService);
    postsListStore = spectator.inject(PostsListStore);
    httpController = spectator.inject(HttpTestingController);
  });

  it('should get all data', function () {
    const url = environment.apiUrl + '/posts';

    spectator.service.getAll().subscribe((res) => {
      expect(res).toEqual(mockPostData);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}`,
    });

    req.flush(mockPostData);
  });

  describe('CRUD', () => {
    const mockPost = mockPostData[0];

    it('should get post by id', function () {
      const url = environment.apiUrl + '/posts/1';

      spectator.service.getOne('1').subscribe((res) => {
        expect(res).toEqual(mockPostData);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: `${url}`,
      });

      req.flush(mockPostData);
    });

    it('should create new post', function () {
      const url = environment.apiUrl + '/posts';

      spectator.service
        .create({ title: mockPost.title, body: mockPost.body })
        .subscribe((res) => {
          expect(res).toEqual({
            body: mockPost.body,
            title: mockPost.title,
            id: 2,
          });
        });

      const req = httpController.expectOne({
        method: 'POST',
        url: `${url}`,
      });

      req.flush({
        body: mockPost.body,
        title: mockPost.title,
        id: 2,
      });
    });

    it('should delete post', function () {
      const url = environment.apiUrl + `/posts/${mockPost.id}`;

      spectator.service.delete(mockPost).subscribe((res) => {
        expect(res).toEqual({});
      });

      const req = httpController.expectOne({
        method: 'DELETE',
        url: `${url}`,
      });

      req.flush({});
    });

    it('should update post', function () {
      const url = environment.apiUrl + `/posts/${mockPost.id}`;

      spectator.service.update(mockPost).subscribe((res) => {
        expect(res).toEqual(mockPost);
      });

      const req = httpController.expectOne({
        method: 'PATCH',
        url: `${url}`,
      });

      req.flush(mockPost);
    });

    describe('Sorting', () => {
      describe('Sort by body', () => {
        it('should sort by body asc', function () {
          const sortedEntities = spectator.service.sortBy(mockPostData, {
            active: 'body',
            direction: 'asc',
          });

          expect(sortedEntities[0]).toEqual(mockPostData[0]);
        });

        it('should sort by body desc', function () {
          const sortedEntities = spectator.service.sortBy([...mockPostData], {
            active: 'body',
            direction: 'desc',
          });

          expect(sortedEntities[0]).toEqual(mockPostData[1]);
        });

        it('should not sort if body prop is null', function () {
          const sortedEntities = spectator.service.sortBy([...invalidData], {
            active: 'body',
            direction: 'desc',
          });

          expect(sortedEntities[0]).toEqual(invalidData[0]);
        });
      });

      describe('Sort by title', () => {
        it('should sort by title asc', function () {
          const sortedEntities = spectator.service.sortBy(mockPostData, {
            active: 'title',
            direction: 'asc',
          });

          expect(sortedEntities[0]).toEqual(mockPostData[0]);
        });

        it('should sort by title desc', function () {
          const sortedEntities = spectator.service.sortBy([...mockPostData], {
            active: 'title',
            direction: 'desc',
          });

          expect(sortedEntities[0]).toEqual(mockPostData[1]);
        });

        it('should not sort if title prop is null', function () {
          const sortedEntities = spectator.service.sortBy([...invalidData], {
            active: 'title',
            direction: 'desc',
          });

          expect(sortedEntities[0]).toEqual(invalidData[0]);
        });
      });

      describe('Default sorting', () => {
        it('should sort by id if sorting is not by body or title', function () {
          const sortedEntities = spectator.service.sortBy(mockPostData, {
            active: 'actions',
            direction: 'asc',
          });

          expect(sortedEntities[0]).toEqual(mockPostData[0]);
        });

        it('should not sort if title prop is null', function () {
          const sortedEntities = spectator.service.sortBy([...invalidData], {
            active: 'actions',
            direction: 'desc',
          });

          expect(sortedEntities[0]).toEqual(invalidData[0]);
        });
      });
    });
  });
});
