/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import helper from './modelHelper';
import model from '../../models';

const Role = model.roles;

const firstRole = helper.createAdminRole();

describe('The Role Model Test Suite', () => {
  describe('The Process of creation of a Role', () => {
    before(() => {
      Role.create(firstRole)
        .then((createdRole) => {
          createdRole;
        });
    });

    it('should allow a creator to define the title of role created', () => {
      expect(firstRole).to.include.keys('title');
    });
  });

  describe('Role Model Validations Test Suite', () => {
    describe('Validation for the Title field', () => {
      it('should ensure that a title is given before a role can be created',
        () => {
          Role.create()
            .catch((error) => {
              expect(/notNull Violation/.test(error.message)).to.be.true;
            });
        });

      it(`should ensure that it is impossible
      to create two roles with the same title`,
        () => {
          Role.create(firstRole)
            .then(() => {
              // attempt to create a second role with same title
              Role.create(firstRole)
                .catch((error) => {
                  expect(/UniqueConstraintError/.test(error.name)).to.be.true;
                });
            });
        });
    });
  });
});
