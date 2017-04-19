import faker from 'faker';

const legitUsers = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    userName: 'admin',
    password: '123456',
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Ike',
    lastName: 'Grace',
    email: 'ikgrace@example.com',
    userName: 'ikgrace',
    password: 'breadsing',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'foluke',
    lastName: 'Adeleke',
    email: 'folade@example.com',
    userName: 'folade',
    password: 'uba2345',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Liam',
    lastName: 'Hemsworth',
    email: 'hemsli@example.com',
    userName: 'hemsli',
    password: 'story098',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Paul',
    lastName: 'Pogba',
    email: 'chesse@example.com',
    userName: 'papog',
    password: 'oke160',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const invalidUsers = [
  {
    firstName: faker.name.firstName,
    lastName: faker.name.lastName,
    email: 'macroni@example.com',
    userName: faker.name.userName,
    password: 'incorrect',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: faker.name.firstName,
    lastName: faker.name.lastName,
    email: faker.name.email,
    userName: faker.name.userName,
    password: '',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: faker.name.firstName,
    lastName: faker.name.lastName,
    email: faker.name.email,
    userName: 'blissinit',
    password: 'incorrect',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export {
  legitUsers,
  invalidUsers
};
