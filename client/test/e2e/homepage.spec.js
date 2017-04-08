module.exports = {
  before: function (browser, done) {
  	server = require('./server')(done) // done is a callback that executes when the server is started
  },

  after: function () {
  	server.close()
  },

  'Demo test': function (browser) {
    browser
      .url('localhost:6060')   // visit the local url
      .waitForElementVisible('body'); // wait for the body to be rendered

    browser
      .assert.containsText('body') // assert contains
      .saveScreenshot(conf.imgpath(browser) + 'dwyl.png')
      .end()
  }


  'Guinea Pig Assert Title': function(browser) {
    browser
      .url('https://saucelabs.com/test/guinea-pig')
      .waitForElementVisible('body')
      .assert.title('I am a page title - Sauce Labs')
      .saveScreenshot('guinea-pig-test.png')
      .end();
  }

}
