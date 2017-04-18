import db from '../models';

const RoleController = {
  createNewRole(request, response) {
    let roleData = {};
    roleData = { title: request.body.title };
    if (!request.body.title) {
      return response.status(400).send({ message: 'Title cannot be blank' });
    }
    db.roles.findOne({
      where: { title: request.body.title }
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
        response.status(201).send(role);
      })
      .catch((err) => {
        response.status(400).send({ message:
          'There was a error creating this role',
          err });
      });
    });
  },

  updateRole(request, response) {
    const title = request.body.title;
    if (!title) {
      return response.status(404).send({ message:
        'You need to write the Title you want to update' });
    }
    db.roles
      .findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404).send({ message:
            'Cannot update a role that does not exist' });
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
        response.status(200).send(allRoles);
      })
      .catch((err) => {
        response.status(404).send({ message:
          'A problem was encountered while getting roles', err });
      });
  },

  getSpecificRole(request, response) {
    db.roles
      .findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404).send({ message:
            `Role with the id: ${request.params.id} does not exist` });
        }
        response.status(200).send({ message:
          'The Role you want has been found',
          data: role });
      });
  }
};

export default RoleController;
