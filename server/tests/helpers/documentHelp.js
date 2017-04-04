import faker from 'faker';

const goodDocs = [
  {
    title: 'Digitized impactful Graphic Interface',
    content: `Cumque dolorum laborum sint id. Error cumque ipsa culpa
    est delectus dolores consequatur et laudantium.
    Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et quae eveniet.
    Ut adipisci ut occaecati id assumenda nihil. Eos repudiandae est sed
    qui est sapiente temporibus dolorem.`,
    access: 'public',
    userId: 1,
    userRoleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Customer-focused 4th generation policy',
    content: `Id consectetur omnis repudiandae optio quia expedita
    quam aut.Magni dolorem necessitatibus.
     Culpa tenetur officiis velit.Impedit modi exercitationem sed in
     non voluptate sapiente aperiam. Impedit nesciunt architecto et omnis
    cum sit eligendi blanditiis.Aut suscipit quos.`,
    access: 'private',
    userId: 2,
    userRoleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Balanced human-resource implementation',
    content: `Dignissimos doloribus odit reiciendis
    molestias aut accusamus. Vel quam ratione voluptas. Sed ea maiores.
    Cupiditate iste in laborum quia et. Blanditiis unde vero qui. Dolores
    dolores natus mollitia et velit.`,
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
