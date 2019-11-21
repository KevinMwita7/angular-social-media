import { BrowsePageDialogModule } from './browse-page-dialog.module';

describe('BrowsePageDialogModule', () => {
  let browsePageDialogModule: BrowsePageDialogModule;

  beforeEach(() => {
    browsePageDialogModule = new BrowsePageDialogModule();
  });

  it('should create an instance', () => {
    expect(browsePageDialogModule).toBeTruthy();
  });
});
