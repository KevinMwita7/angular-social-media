import { RenderHqImageModule } from './render-hq-image.module';

describe('RenderHqImageModule', () => {
  let renderHqImageModule: RenderHqImageModule;

  beforeEach(() => {
    renderHqImageModule = new RenderHqImageModule();
  });

  it('should create an instance', () => {
    expect(renderHqImageModule).toBeTruthy();
  });
});
