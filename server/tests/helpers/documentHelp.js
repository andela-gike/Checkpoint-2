import faker from 'faker';

const legitDocs = [
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraphs,
    access: 'public',
    userId: 1,
    userRoleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraphs,
    access: 'private',
    userId: 2,
    userRoleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraphs,
    access: 'public',
    userId: 3,
    userRoleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraphs,
    access: 'private',
    userId: 4,
    userRoleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraphs,
    access: 'public',
    userId: 5,
    userRoleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const invalidDocs = [
  {
    title: faker.lorem.word,
    content: '',
    access: 'private',
    userId: 4,
    userRoleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: '',
    content: faker.lorem.paragraph,
    access: 'private',
    userId: 4,
    userRoleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraphs,
    access: '',
    userId: 4,
    userRoleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export {
  legitDocs,
  invalidDocs
};
