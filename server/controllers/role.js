const Roles = require('./../models/role');
const userCtrller = require('./user');

const roleCtrller = {
  createRole: (request, response) => {
    const access = request.token.body.access;

    if (access === 'Admin') {
      Roles.find({ title: request.body.title }, (err, roles) => {
        if (!roles.length) {
          const role = new Roles();
          role.title = request.body.title;

          role.save((err) => {
            if (err) {
              return response.send(err);
            }
            return response.json({ message: 'Role created!' });
          });
        } else {
          response.status(409).json({ message: 'Role already exists!' });
        }
      });
    } else {
      response.status(403).json({ message: 'You have no access to do that' });
    }
  },

  all: (request, response) => {
    Roles.find((err, roles) => {
      if (err) {
        response.status(400).json(err);
      }
      return response.json(roles);
    });
  },

  updateRole: (request, response) => {
    const access = request.token.body.access;

    if (access === 'Admin') {
      Roles.findById(request.params.role_id, (err, role) => {
        if (err || !role) {
          return response.status(400).json({ message: 'No such role!' });
        }

        role.title = request.body.title;

        role.save((err) => {
          if (err) {
            return response.status(400).err;
          }
          return response.status(200).json({ message: 'Role saved' });
        });
      });
    }
  },

  deleteRole: (request, response) => {
    Roles.remove({
      _id: request.params.role_id,
    }, (err) => {
      if (err) {
        return response.status(400).err;
      }
      return response.json({ message: 'Successfully deleted' });
    });
  }
};
module.exports = roleCtrller;
