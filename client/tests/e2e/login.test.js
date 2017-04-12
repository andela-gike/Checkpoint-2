/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const config = require('../../../nightwatch.conf.js');

module.exports = {
  'Document Management System': function (browser) {
    browser
      .url('http://localhost:6060/login')
      .waitForElementVisible('body')
      .assert.title('DoCMan')
      .saveScreenshot('document-management-login.png')
      .end();
  },

  'Login Users': function (browser) {
    browser
      .url('http://localhost:6060/login')
      .waitForElementVisible('body')
      .setValue('input[type=text]', 'admin@example.com')
      .setValue('input[type=password]', '123456')
      .click('button[type="submit"]')
      .waitForElementVisible('h4')
      .assert.urlEquals('http://localhost:6060/login')
      .end();
  },

  'Admin Dashboard Page': function (browser) {
    browser
      .url('http://localhost:6060/dashboard')
      .waitForElementVisible('input[type=text]')
      .setValue('input[type=text]', 'admin@example.com')
      .setValue('input[type=password]', '123456')
      .click('button[type="submit"]')
      .waitForElementVisible('nav', 5000)
      .assert.urlEquals('http://localhost:6060/login')
      .assert.containsText('nav', 'Home')
      .assert.containsText('nav', 'Saved Documents')
      .assert.containsText('nav', 'Manage Users')
      .assert.containsText('nav', 'Manage Roles')
      .assert.containsText('nav', 'Logout')
      .end();
  },

  'Regular Users Dashboard Page': function (browser) {
    browser
      .url('http://localhost:6060/dashboard')
      .waitForElementVisible('body')
      .setValue('input[type=text]', 'testing@gmail.com')
      .setValue('input[type=password]', '1234567890')
      .click('button[type="submit"]')
      .waitForElementVisible('nav', 5000)
      .assert.urlEquals('http://localhost:6060/login')
      .assert.containsText('nav', 'Home')
      .assert.containsText('nav', 'Saved Documents')
      .assert.containsText('nav', 'Logout')
      .assert.elementNotPresent('#admin')
      .assert.cssClassNotPresent('nav', 'admin')
      .end();
  }
};
