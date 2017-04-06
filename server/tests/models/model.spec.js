import { expect } from 'chai';
import model from '../../models';

describe('Create Models', () => {
  it('Should have the User model', () => {
    expect(model.users).to.exist;
  });
  it('Should have the Role model', () => {
    expect(model.roles).to.exist;
  });
  it('Should have the Document model', () => {
    expect(model.documents).to.exist;
  });
});
