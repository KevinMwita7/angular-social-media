import { RenderPostsModule } from './render-posts.module';

describe('RenderPostsModule', () => {
  let renderPostsModule: RenderPostsModule;

  beforeEach(() => {
    renderPostsModule = new RenderPostsModule();
  });

  it('should create an instance', () => {
    expect(renderPostsModule).toBeTruthy();
  });
});
