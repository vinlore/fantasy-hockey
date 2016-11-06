import { FantasyHockeyPage } from './app.po';

describe('fantasy-hockey App', function() {
  let page: FantasyHockeyPage;

  beforeEach(() => {
    page = new FantasyHockeyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
