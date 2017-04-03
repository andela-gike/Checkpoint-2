import faker from 'faker';

const goodDocs = [
  {
    title: 'Inverse optimal website',
    content: `Dignissimos debitis reiciendis ea illo quia.
    Dicta fugiat quasi id consequuntur officiis sequi similique.
    Voluptatum voluptatem et. Necessitatibus maiores quidem molestias.
    Tempore omnis ipsam et. Tempora maxime laboriosam expedita est aperiam
    quibusdam error itaque assumenda. Natus aut est provident non voluptatem
    ducimus. Qui commodi minus est eligendi enim iure iusto dolore.
    Quibusdam officiiscupiditate praesentium omnis cum.`,
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
  goodDocs,
  invalidDocs
};
