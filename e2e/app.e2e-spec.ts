import { PROJECTTestPage } from './app.po';

describe('project-test App', () => {
  let page: PROJECTTestPage;

  beforeEach(() => {
    page = new PROJECTTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
