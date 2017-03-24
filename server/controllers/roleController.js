import db from '../models';

const RoleController = {
  createNewRole(req, res) {
    let roleData = {};
    if (req.body.id) {
      roleData = { title: req.body.title, id: req.body.id };
    } else { roleData = { title: req.body.title }; }
    if (!req.body.title) {
      return res.status(400).send({ message: 'Title cannot be blank' });
    }
    const title = req.body.title;
    db.roles.findOne({
      where: { title }
    })
    .then((result) => {
      if (result) {
        return res.status(409).send({
          success: false,
          message: 'Role already exists'
        });
      }
      return db.roles
      .create(roleData)
      .then((role) => {
        res.status(200).send({
          message:
          'The role was successfully created',
          role
        });
      })
      .catch((err) => {
        res.status(400).send({ message: 'error', err });
      });
    });
  },

  updateRole(req, res) {
    const title = req.body.title;
    if (!title) {
      return res.status(404).send({
        message:
        'You need to write the Title you want to update'
      });
    }
    db.roles
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message:
            'Cannot update a role that does not exist'
          });
        }
        role.update({
          title: req.body.title || role.title
        })
        .then((updatedRole) => {
          res.status(200).send({
            message: 'Role was successfully updated',
            Role: updatedRole
          });
        });
      });
  },

  deleteRole(req, res) {
    db.roles
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message:
            'Cannot delete a role that does not exist'
          });
        }
        role.destroy()
        .then(() => {
          res.status(200)
            .send({ message: 'Role was successfully deleted' });
        });
      });
  },

  listAllRoles(req, res) {
    db.roles
      .findAll()
      .then((allRoles) => {
        if (!allRoles) {
          return res.status(404).send({
            message:
            'A problem was encountered while getting roles'
          });
        }
        res.status(200).send({
          message: 'This is a list of the available roles',
          allRoles
        });
      });
  },

  getSpecificRole(req, res) {
    db.roles
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message:
            `Role with the id: ${req.params.id} does not exist`
          });
        }
        res.status(200).send({
          message: 'The Role you want has been found',
          role
        });
      });
  }
};

export default RoleController;
