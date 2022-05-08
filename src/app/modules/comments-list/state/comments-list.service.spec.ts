import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { CommentsListService } from './comments-list.service';
import { CommentsListStore } from './comments-list.store';
import { CommentsListModule } from '../comments-list.module';
import { environment } from '../../../../environments/environment';

const mockCommentData = [
  {
    postId: 1,
    id: 1,
    name: 'a',
    email: 'a',
    body: 'a',
  },
  {
    postId: 2,
    id: 2,
    name: 'b',
    email: 'b',
    body: 'b ',
  },
];

const invalidData = [
  { ...mockCommentData[0], body: null, name: null, email: null, id: null },
  { ...mockCommentData[1], body: null, name: null, email: null, id: null },
];

describe('GetData', () => {
  let spectator: SpectatorService<CommentsListService>;
  let postsListService: CommentsListService;
  let postsListStore: CommentsListStore;
  let httpController: HttpTestingController;

  const createService = createServiceFactory({
    service: CommentsListService,
    providers: [CommentsListStore],
    imports: [CommentsListModule, HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    postsListService = spectator.inject(CommentsListService);
    postsListStore = spectator.inject(CommentsListStore);
    httpController = spectator.inject(HttpTestingController);
  });

  it('should get all data', function () {
    const url = environment.apiUrl + '/posts/1/comments';

    spectator.service.getAll('1').subscribe((res) => {
      expect(res).toEqual(mockCommentData);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}`,
    });

    req.flush(mockCommentData);
  });

  describe('CRUD', () => {
    const mockPost = mockCommentData[0];

    it('should get post by id', function () {
      const url = environment.apiUrl + '/posts/1';

      spectator.service.getOne('1').subscribe((res) => {
        expect(res).toEqual(mockCommentData);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: `${url}`,
      });

      req.flush(mockCommentData);
    });

    // it('should create new comment', function () {
    //   const url = environment.apiUrl + '/posts';
    //
    //   spectator.service
    //     .create({ title: mockPost.title, body: mockPost.body })
    //     .subscribe((res) => {
    //       expect(res).toEqual({
    //         body: mockPost.body,
    //         title: mockPost.title,
    //         id: 2,
    //       });
    //     });
    //
    //   const req = httpController.expectOne({
    //     method: 'POST',
    //     url: `${url}`,
    //   });
    //
    //   req.flush({
    //     body: mockPost.body,
    //     title: mockPost.title,
    //     id: 2,
    //   });
    // });
    //
    // it('should delete post', function () {
    //   const url = environment.apiUrl + `/posts/${mockPost.id}`;
    //
    //   spectator.service.delete(mockPost).subscribe((res) => {
    //     expect(res).toEqual({});
    //   });
    //
    //   const req = httpController.expectOne({
    //     method: 'DELETE',
    //     url: `${url}`,
    //   });
    //
    //   req.flush({});
    // });
    //
    // it('should update post', function () {
    //   const url = environment.apiUrl + `/posts/${mockPost.id}`;
    //
    //   spectator.service.update(mockPost).subscribe((res) => {
    //     expect(res).toEqual(mockPost);
    //   });
    //
    //   const req = httpController.expectOne({
    //     method: 'PATCH',
    //     url: `${url}`,
    //   });
    //
    //   req.flush(mockPost);
    // });

    describe('Sorting', () => {
      describe('Sort by body', () => {
        it('should sort by body asc', function () {
          const sortedEntities = spectator.service.sortBy(mockCommentData, {
            active: 'body',
            direction: 'asc',
          });

          expect(sortedEntities[0]).toEqual(mockCommentData[0]);
        });

        it('should sort by body desc', function () {
          const sortedEntities = spectator.service.sortBy(
            [...mockCommentData],
            {
              active: 'body',
              direction: 'desc',
            }
          );

          expect(sortedEntities[0]).toEqual(mockCommentData[1]);
        });

        it('should not sort if body prop is null', function () {
          const sortedEntities = spectator.service.sortBy([...invalidData], {
            active: 'body',
            direction: 'desc',
          });

          expect(sortedEntities[0]).toEqual(invalidData[0]);
        });
      });

      describe('Sort by name', () => {
        it('should sort by title asc', function () {
          const sortedEntities = spectator.service.sortBy(mockCommentData, {
            active: 'name',
            direction: 'asc',
          });

          expect(sortedEntities[0]).toEqual(mockCommentData[0]);
        });

        it('should sort by title desc', function () {
          const sortedEntities = spectator.service.sortBy(
            [...mockCommentData],
            {
              active: 'name',
              direction: 'desc',
            }
          );

          expect(sortedEntities[0]).toEqual(mockCommentData[1]);
        });

        it('should not sort if title prop is null', function () {
          const sortedEntities = spectator.service.sortBy([...invalidData], {
            active: 'name',
            direction: 'desc',
          });

          expect(sortedEntities[0]).toEqual(invalidData[0]);
        });
      });

      describe('Sort by name', () => {
        it('should sort by email asc', function () {
          const sortedEntities = spectator.service.sortBy(mockCommentData, {
            active: 'email',
            direction: 'asc',
          });

          expect(sortedEntities[0]).toEqual(mockCommentData[0]);
        });

        it('should sort by email desc', function () {
          const sortedEntities = spectator.service.sortBy(
            [...mockCommentData],
            {
              active: 'email',
              direction: 'desc',
            }
          );

          expect(sortedEntities[0]).toEqual(mockCommentData[1]);
        });

        it('should not email if title prop is null', function () {
          const sortedEntities = spectator.service.sortBy([...invalidData], {
            active: 'email',
            direction: 'desc',
          });

          expect(sortedEntities[0]).toEqual(invalidData[0]);
        });
      });

      describe('Default sorting', () => {
        it('should sort by id if sorting is not by body or title', function () {
          const sortedEntities = spectator.service.sortBy(mockCommentData, {
            active: 'actions',
            direction: 'asc',
          });

          expect(sortedEntities[0]).toEqual(mockCommentData[0]);
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
