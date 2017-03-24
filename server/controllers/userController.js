import jwt from 'jsonwebtoken';
import moment from 'moment';
import db from '../models';


const secret = process.env.SECRET || 'Happypeopledontkeepsecret';
const expires = moment().add(1, 'days').valueOf();


const UserController = {
  createNewUser(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const userName = req.body.username;
    const password = req.body.password;
    if (!firstName || !lastName || !email || !userName || !password) {
      return res.status(400).send({
        message: 'The paramaters are incomplete',
      });
    }
    db.users.findOne({ where: { $or: { email, userName } } })
      .then((userExists) => {
        if (userExists) {
          return res.status(400).send({
            message: `There is a user already existing
            with this email or username`
          });
        }
        return db.users
          .create(req.body)
          .then((user) => {
            const payload = {
              userId: user.id,
              roleId: user.roleId
            };
            const token = jwt.sign(payload, secret, { expiresIn: expires });
            return res.status(201).send({
              message: 'User was successfully created',
              token,
              data: user
            });
          })
          .catch((err) => {
            res.status(400).send({
              message: 'There was a problem creating this user', err
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
        if (!user) {
          return res.status(403).send({
            message: 'User was not found'
          });
        }
        if (!user.validatePassword(req.body.password)) {
          return res.status(401).send({
            message: 'Invalid password',
          });
        }
        if (user && user.validatePassword(req.body.password)) {
          const payload = {
            userId: user.id,
            roleId: user.roleId
          };
          const token = jwt.sign(payload, secret, { expiresIn: expires });
          return res.status(200).send({
            message: 'You were successfully logged in',
            token,
            expiresIn: expires
          });
        }
      })
      .catch((err) => {
        res.status(401).send({
          message:
          'There was a problem while logging in due to invalid credentials',
          err
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
          message: `User ${req.params.id} was not found`, err
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
          message: 'There was a problem getting all users',
          err
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
            userName: req.body.userName || user.userName,
            password: req.body.password || user.password
          })
          .then((updatedProfile) => {
            res.status(200).send({
              message: 'User information updated successfully',
              data: updatedProfile
            });
          });
        } else {
          res.status(404).send({
            message:
              'Cannot update the information of a user that does not exist'
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
            message: 'Cannot delete a user that does not exist'
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
      .findAll({
        where: { id: req.params.id },
        include: [{ model: db.documents, attributes: userDetails.doc }]
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message:
                'Cannot get the documents of a user that does not exist'
          });
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
