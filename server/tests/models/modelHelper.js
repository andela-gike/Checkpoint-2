/* eslint-disable import/no-extraneous-dependencies */

import faker from 'faker';

module.exports = {
  createAdmin: () => {
    const roleId = 1;
    const fakeUser = {
      firstName: 'firstName()',
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      userName: faker.internet.userName(),
      password: faker.internet.password(),
      roleId
    };
    return fakeUser;
  },

  createUser: () => {
    const roleId = 2;
    const fakeUser2 = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      userName: faker.internet.userName(),
      password: faker.internet.password(),
      roleId
    };
    return fakeUser2;
  },

  createAdminRole: () => {
    const testRole = {
      title: 'admin',
    };
    return testRole;
  },

  createRegularRole: () => {
    const sampleRole = {
      title: 'regular'
    };
    return sampleRole;
  },

  createDocument: () => {
    const fakeDocument = {
      title: faker.lorem.word(),
      content: faker.lorem.sentences(),
      access: 'public'
    };
    return fakeDocument;
  },

  createPrivateDocument: () => {
    const testDocument = {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
    };
    return testDocument;
  },

  createRoleDocument: () => {
    const sampleDocument = {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      // access: 'role',
    };
    return sampleDocument;
  },

  documentsBundle() {
    const documentProperties = [];
    for (let i = 0; i <= 15; i += 1) {
      documentProperties.push({
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        ownerId: 1
      });
    }
    return documentProperties;
  }
};

