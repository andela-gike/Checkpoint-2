import * as role from './roleHelp';
import * as user from './userHelp';
import * as doc from './documentHelp';

export default {
  legitRoles: role.legitRoles,
  invalidRoles: role.invalidRoles,

  legitUsers: user.legitUsers,
  invalidUsers: user.invalidUsers,

  goodDocs: doc.goodDocs,
  invalidDocs: doc.invalidDocs
};
