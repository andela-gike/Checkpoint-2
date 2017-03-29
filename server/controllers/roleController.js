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
    const title = request.body.title;
    db.roles.findOne({
      where: { title }
    })
    .then((result) => {
      if (result) {
        return response.status(409).send({
          success: false,
          message: 'Role already exists'
        });
      }
      return db.roles
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
    });
  },

  updateRole(request, response) {
    db.roles
      .findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404).send({ message: 'Cannot update a role that does not exist' });
        }
        const title = request.body.title;
        if (!title) {
          return response.status(404).send({ message: 'You need to write the Title you want to update' });
        }
        role.update({
          title: request.body.title || role.title
        })
        .then((updatedRole) => {
          response.status(200).send({
            message: 'Role was successfully updated',
            data: updatedRole });
        });
      });
  },

  deleteRole(request, response) {
    db.roles
      .findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404).send({
            message:
            'Cannot delete a role that does not exist'
          });
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
        response.status(200).send({ message: 'This is a list of the available roles', data: allRoles });
      })
      .catch((err) => {
        response.status(404).send({ message: 'A problem was encountered while getting roles', err });
      });
  },

  getSpecificRole(request, response) {
    db.roles
      .findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404).send({ message: `Role with the id: ${request.params.id} does not exist` });
        }
        response.status(200).send({ message: 'The Role you want has been found', data: role });
      });
  }
};

export default RoleController;
