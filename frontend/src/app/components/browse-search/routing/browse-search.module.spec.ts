import { BrowseSearchModule } from './browse-search.module';

describe('BrowseSearchModule', () => {
  let browseSearchModule: BrowseSearchModule;

  beforeEach(() => {
    browseSearchModule = new BrowseSearchModule();
  });

  it('should create an instance', () => {
    expect(browseSearchModule).toBeTruthy();
  });
});
