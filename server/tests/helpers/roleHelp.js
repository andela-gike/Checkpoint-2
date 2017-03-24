const legitRoles = [
  {
    title: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'viewer',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const invalidRoles = [
  {
    title: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export {
  legitRoles,
  invalidRoles
};
