'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /phoneView when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/phoneView");
  });


  describe('phoneView', function() {

    beforeEach(function() {
      browser.get('index.html#!/phoneView');
    });


    it('should render phoneView when user navigates to /phoneView', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('tabletView', function() {

    beforeEach(function() {
      browser.get('index.html#!/tabletView');
    });


    it('should render tabletView when user navigates to /tabletView', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
