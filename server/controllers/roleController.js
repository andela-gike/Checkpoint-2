import db from '../models';

const RoleController = {
  createNewRole(request, response) {
    let roleData = {};
    if (request.body.id) {
      roleData = { title: request.body.title, id: request.body.id };
    } else { roleData = { title: request.body.title }; }
    if (!request.body.title) {
      return response.status(400).send({ message: 'Title cannot be blank' });
    }
    db.roles
      .create(roleData)
      .then((role) => {
        response.status(200).send({
          message:
          'The role was successfully created',
          role
        });
      })
      .catch((err) => {
        response.status(400).send({ message: 'error', err });
      });
  },

  updateRole(request, response) {
    db.roles
      .findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404).send({ message: 'Role was not found' });
        }
        role.update({
          title: request.body.title || role.title
        })
        .then((updatedRole) => {
          response.status(200).send({
            message: 'Role was successfully updated',
            Role: updatedRole
          });
        });
      });
  },

  deleteRole(request, response) {
    db.roles
      .findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404).send({ message: 'Role was not found' });
        }
        role.destroy()
        .then(() => {
          response.status(200)
            .send({ message: 'Role was successfully deleted' });
        });
      });
  },

  listAllRoles(request, response) {
    db.roles
      .findAll()
      .then((allRoles) => {
        if (!allRoles) {
          return response.status(404).send({
            message:
            'A problem was encountered while getting roles'
          });
        }
        response.status(200).send({ message: allRoles });
      });
  },

  getSpecificRole(request, response) {
    db.roles
      .findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404).send({ message: 'Role was not found' });
        }
        response.status(200).send({ message: role });
      });
  }
};

export default RoleController;
