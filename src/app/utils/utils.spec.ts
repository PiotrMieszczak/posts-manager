import { assertProperties } from './utils';

describe('Utils', () => {
  it('should assert properties', () => {
    const objectMock = { user: 1, title: '', body: '' };
    const condition = assertProperties(['title', 'body'], objectMock);

    expect(condition).toBeTruthy();
  });
});
