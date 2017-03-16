import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.config({ silent: true });

const secret = process.env.SECRET || 'Happypeopledontkeepsecret';

const UserController = {
  createNewUser(req, res) {
    db.users.findOne({ where: { email: req.body.email } })
      .then((userExists) => {
        if (userExists) {
          return res.status(400).send({
            message: 'There is a user already existing with this email'
          });
        }
        db.users
          .create(req.body)
          .then((user) => {
            const payload = {
              userId: user.id,
              roleId: user.roleId
            };
            const token = jwt.sign(payload, secret, { expiresIn: '24h' });
            return res.status(201).send({
              message: 'User was successfully created',
              token,
              data: user
            });
          })
          .catch((err) => {
            res.status(400).send({
              message: err.message
            });
          });
      });
  },

  loginUser(req, res) {
    db.users
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((user) => {
        if (user && user.validatePassword(req.body.password)) {
          const payload = {
            userId: user.id,
            roleId: user.roleId
          };
          const token = jwt.sign(payload, secret, { expiresIn: '24h' });
          return res.status(200).send({
            message: 'You were successfully logged in',
            token,
            expiresIn: '24h'
          });
        }
      })
      .catch((err) => {
        res.status(401).send({
          message: `There was a problem while logging in ${err.message}`,
        });
      });
  },

  findUserById(req, res) {
    const userDetails = {
      user: ['id', 'firstName', 'lastName', 'email', 'username'],
      role: ['id', 'title']
    };
    const query = {
      where: {
        id: req.params.id
      },
      attributes: userDetails.user,
      include: [
        {
          model: db.roles,
          attributes: userDetails.role
        }
      ]
    };
    db.users
      .findOne(query)
      .then((user) => {
        if (user) {
          return res.status(200).send({ message: 'User found!', data: user });
        }
      })
      .catch((err) => {
        res.status(404).send({
          message: `User ${req.params.id} was not found`
        });
      });
  },

  listAllUsers(req, res) {
    const userDetails = {
      user: ['id', 'firstName', 'lastName', 'email', 'username'],
      role: ['id', 'title']
    };
    const query = {
      attributes: userDetails.user,
      include: [
        {
          model: db.roles,
          attributes: userDetails.role
        }
      ]
    };
    db.users
      .findAll(query)
      .then((allUsers) => {
        if (allUsers) {
          res.status(200).send({
            message: 'Listing available users',
            data: allUsers
          });
        }
      })
      .catch((err) => {
        res.status(404).send({
          message: 'There was a problem getting all users'
        });
      });
  },

  updateUser(req, res) {
    db.users
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          if (toString(req.decodedToken.userId) !== toString(req.params.id)) {
            return res.send({ message: 'Request not allowed' });
          }
          user.update({
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
            email: req.body.email || user.email,
            username: req.body.username || user.username,
            password: req.body.password || user.password
          })
          .then((updatedProfile) => {
            res.status(200).send({
              message: 'Information updated successfully',
              data: updatedProfile
            });
          });
        } else {
          res.status(404).send({
            message: 'User was not found'
          });
        }
      });
  },

  deleteUser(req, res) {
    db.users
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          if (toString(req.decodedToken.userId) !== toString(req.params.id)) {
            return res.send({ message: 'Request not allowed' });
          }
          user.destroy()
          .then(() => {
            res.status(200).send({
              message: 'User was deleted successfully'
            });
          });
        } else {
          res.status(404).send({
            message: 'User was not found'
          });
        }
      });
  },

  listUserDocuments(req, res) {
    const userDetails = {
      user: ['id', 'firstName', 'lastName', 'email', 'username'],
      doc: ['id', 'title', 'content']
    };
    db.users
      .findAll({ where: { id: req.params.id }, include: [{ model: db.documents, attributes: userDetails.doc }] })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User was not found' });
        }
        res.status(200).send({ message: user });
      });
  },

  logoutUser(req, res) {
    res.status(200).send({
      message: 'You were logged out successfully'
    });
  }
};

export default UserController;
