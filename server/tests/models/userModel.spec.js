/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import model from '../../models';
import helper from './modelHelper';

const Role = model.roles;
const User = model.users;

const fakeRole = helper.createAdminRole();
const fakeUser = helper.createUser();

const requiredParams = ['firstName', 'lastName', 'email', 'userName',
  'password', 'roleId'];

const uniqueParams = ['userName', 'email'];

describe('The User Model Test Suite', () => {
  describe('The Process of creation of a User', () => {
    let user;
    before((done) => {
      Role.create(fakeRole)
        .then((createdRole) => {
          fakeUser.roleId = createdRole.id;
          return User.create(fakeUser);
        })
        .then((createdUser) => {
          user = createdUser;
          done();
        });
    });


    it('should allow the creation of a user', () => {
      expect(user).to.exist;
      expect(typeof user).to.equal('object');
    });

    it('should ensure that a created user has a firstName', () => {
      expect(user.firstName).to.equal(fakeUser.firstName);
    });

    it('should ensure that a created user has a lastName', () => {
      expect(user.lastName).to.equal(fakeUser.lastName);
    });

    it('should ensure that a created user has a valid email address', () => {
      expect(user.email).to.equal(fakeUser.email);
    });

    it('should ensure that a created user has a userName', () => {
      expect(user.userName).to.equal(fakeUser.userName);
    });

    it('should hash the password of the created user', () => {
      expect(user.password).to.not.equal(fakeUser.password);
    });

    it('should allow for the updating of the details of a user', (done) => {
      User.findById(user.id)
        .then(createdUser => createdUser.update({ userName: 'grace' }))
        .then((updatedUser) => {
          expect(updatedUser.userName).to.equal('grace');
          done();
        });
    });
  });

  describe('The working of the Validation of the User model', () => {
    let user;
    beforeEach((done) => {
      Role.create(fakeRole)
        .then((role) => {
          fakeUser.roleId = role.id;
          user = User.build(fakeUser);
          done();
        });
    });

    describe('the fields necessary before a user can be created', () => {
      requiredParams.forEach((field) => {
        it(`requires ${field} to create a user`, (done) => {
          user[field] = null;
          user.save()
            .catch((error) => {
              expect(/notNull Violation/.test(error.message)).to.be.true;
              done();
            });
        });
      });
    });

    describe('Fields that have to be unique in the creation of users', () => {
      uniqueParams.forEach((field) => {
        it(`requires ${field} field to be Unique`, () => {
          user.save()
            .then((firstUser) => {
              fakeUser.roleId = firstUser.roleId;
              // attempt to create another user with same parameters
              return User.build(fakeUser).save();
            })
            .catch((error) => {
              expect(/UniqueConstraintError/.test(error.name)).to.be.true;
            });
        });
      });
    });

    describe('Mail Validation', () => {
      it('should require an authentic user email', () => {
        user.email = 'helenpaul@gmail.com';
        user.save()
          .catch((error) => {
            expect(/isEmail failed/.test(error.message)).to.be.true;
            expect(/SequelizeValidationError/.test(error.name)).to.be.true;
          });
      });
    });

    describe('Password Validation', () => {
      it('should be valid when passed into the password validation function',
        () => user.save()
          .then((createdUser) => {
            expect(createdUser.validatePassword(fakeUser.password)).to.be.true;
          }));
    });
  });
});
