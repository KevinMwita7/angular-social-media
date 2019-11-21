import { UserMenuModule } from './user-menu.module';

describe('UserMenuModule', () => {
  let userMenuModule: UserMenuModule;

  beforeEach(() => {
    userMenuModule = new UserMenuModule();
  });

  it('should create an instance', () => {
    expect(userMenuModule).toBeTruthy();
  });
});
