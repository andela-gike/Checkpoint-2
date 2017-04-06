import jwt from 'jsonwebtoken';
import moment from 'moment';
import db from '../models';
// import validInput from '../validation/signupvalidator';


const secret = process.env.SECRET || 'Happypeopledontkeepsecret';
const expires = moment().add(1, 'days').valueOf();


const UserController = {
  createNewUser(request, response) {
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const email = request.body.email;
    const userName = request.body.userName;
    const password = request.body.password;
    if (!firstName || !lastName || !email || !userName || !password) {
      return response.status(400).send({
        message: 'The paramaters are incomplete',
      });
    }
    // const { errors, isValid } = validInput(request.body);
    // if (isValid) {
    //   response.json({ success: true });
    // } else {
    //   response.status(400).json(errors);
    // }
    db.users.findOne({ where: { $or: { email, userName } } })
      .then((userExists) => {
        if (userExists) {
          return response.status(400).send({
            message: `There is a user already existing
            with this email or userName`
          });
        }
        return db.users
          .create(request.body)
          .then((user) => {
            const payload = {
              userId: user.id,
              roleId: user.roleId
            };
            const token = jwt.sign(payload, secret, { expiresIn: expires });
            return response.status(201).send({
              message: 'User was successfully created',
              token,
              user: {
                id: user.id,
                userName: user.userName,
                userRoleId: user.roleId,
                email: user.email
              }
            });
          })
          .catch(() => {
            response.status(400).send({
              message: 'There was a problem creating this user'
            });
          });
      });
  },

  loginUser(request, response) {
    db.users
      .findOne({
        where: {
          email: request.body.email
        }
      })
      .then((user) => {
        if (!user) {
          return response.status(400).send({
            message: 'User was not found'
          });
        }
        if (!user.validatePassword(request.body.password)) {
          return response.status(401).send({
            message: 'Invalid password',
          });
        }
        if (user && user.validatePassword(request.body.password)) {
          const payload = {
            userId: user.id,
            roleId: user.roleId
          };
          const token = jwt.sign(payload, secret, { expiresIn: expires });
          response.status(200).send({
            message: 'You are successfully logged in',
            token,
            expiresIn: expires
          });
        } else {
          response.status(401).send({
            message: 'Invalid login credentials',
          });
        }
      })
      .catch((err) => {
        response.status(400).send({
          message:
          'There was a problem while logging in due to invalid credentials',
          err
        });
      });
  },

  findUserById(request, response) {
    db.users
      .findById(request.params.id)
      .then((user) => {
        if (user) {
          user.password = null;
          return response.status(200).send({ message: 'User found!', data: user });
        }
      })
      .catch((err) => {
        response.status(404).send({
          message: 'User was not found', err
        });
      });
  },

  listAllUsers(request, response) {
    const userDetails = {
      user: ['id', 'firstName', 'lastName', 'email', 'userName'],
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
    query.attributes = userDetails.user;
    query.limit = request.query.limit || null;
    query.offset = request.query.offset || null;
    query.order = [['createdAt', 'DESC']];
    db.users
      .findAll({ query: query, limit: query.limit, offset: query.offset })
      .then((allUsers) => {
        if (allUsers) {
          response.status(200).send({
            message: 'Listing available users',
            data: allUsers
          });
        }
      })
      .catch((err) => {
        response.status(400).send({
          message: 'There was a problem getting all users',
          err
        });
      });
  },

  updateUser(request, response) {
    db.users
      .findById(request.params.id)
      .then((user) => {
        if (user) {
          if (String(request.decodedToken.userId) !== String(request.params.id)) {
            return response.send({ message: 'Request not allowed' });
          }
          user.update({
            firstName: request.body.firstName || user.firstName,
            lastName: request.body.lastName || user.lastName,
            email: request.body.email || user.email,
            userName: request.body.userName || user.userName,
            password: request.body.password || user.password
          })
            .then((updatedProfile) => {
              response.status(200).send({
                message: 'User information updated successfully',
                data: updatedProfile
              });
            });
        } else {
          response.status(403).send({
            message:
            'Cannot update the information of a user that does not exist'
          });
        }
      });
  },

  deleteUser(request, response) {
    db.users
      .findById(request.params.id)
      .then((user) => {
        if (user) {
          user.destroy()
            .then(() => {
              response.status(200).send({
                message: 'User was deleted successfully'
              });
            });
        } else {
          response.status(404).send({
            message: 'Cannot delete a user that does not exist'
          });
        }
      });
  },

  listUserDocuments(request, response) {
    const userDetails = {
      user: ['id', 'firstName', 'lastName', 'email', 'userName'],
      doc: ['id', 'title', 'content']
    };
    db.users
      .findAll({
        where: { id: request.params.id },
        include: [{ model: db.documents, attributes: userDetails.doc }]
      })
      .then((user) => {
        if (!user) {
          return response.status(404).send({
            message:
            'Cannot get the documents of a user that does not exist'
          });
        }
        response.status(200).send({ message: 'Documents Found', data: user[0].documents });
      });
  },

  searchUser(request, response) {
    const searchName = request.query.q;
    if (!Object.keys(request.query).length || !searchName) {
      return response.status(400).send({ message: 'Input a valid search term' });
    }
    const query = request.decodedToken.roleId === 1 ? {
      where: {
        $or: {
          userName: { $iLike: `%${searchName}%` },
          firstName: { $iLike: `%${searchName}%` },
          lastName: { $iLike: `%${searchName}%` },
        }
      }
    } : {
      attributes: ['firstName', 'lastName', 'userName'],
      where: {
        $or: {
          userName: { $iLike: `%${searchName}%` },
          firstName: { $iLike: `%${searchName}%` },
          lastName: { $iLike: `%${searchName}%` },
        }
      }
    };
    db.users
      .findAll(query)
      .then((result) => {
        if (result.length === 0) {
          return response.status(404).send({
            message: 'No results were found'
          });
        }
        return response.status(200).send({
          message: 'Search Results!',
          data: { result }
        });
      })
      .catch(() => {
        response.status(404).send({
          error: 'There user was not found'
        });
      });
  },

  logoutUser(request, response) {
    response.status(200).send({
      message: 'You were logged out successfully'
    });
  },


  fetchExistingUser(request, response) {
    db.users
    .find({
      where: {
        $or: [
            { email: request.params.identifier },
            { userName: request.params.identifier }
        ]
      }
    })
    .then((user) => {
      if (!user) {
        response.status(200).json({ error: 'User can be created' });
      }
      response.status(400).json({ error: 'User already exists' });
    })
    .catch(error => response.status(501).json({
      error, err: 'An error occurred while retrieving the user'
    }));
  }

};

export default UserController;
