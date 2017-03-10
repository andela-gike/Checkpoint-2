const User = require('./../models/users');
const jwtNo = require('jsonwebtoken');

const userCtrller = {

  authenticate: (request, response, next) => {
    // check header or url parameters or post parameters for token
    const token = request.body.token || request.query.token ||
    request.headers['secret-token'];
    if (token) {
      try {
        const verified = jwtNo.verify(token, process.env.SECRET);
        request.token = verified;
        next();
      } catch (e) {
        return response.status(401).send({
          message: 'Unverified user',
        });
      }
    } else {
      return response.status(401).send({
        message: 'Unauthorized User',
      });
    }
  },

  createNewuser: (request, response) => {
    const access = request.token.body.access;

    User.find({ email: request.body.email }, (err, users) => {
      if (!users.length) {
        const user = new User();

        user.userName = request.body.userName;
        user.name.first = request.body.firstName;
        user.name.last = request.body.lastName;
        user.email = request.body.email;
        user.password = user.generateHash(request.body.password);
        if (access === 'Admin') {
          user.role = request.body.role || 'User';
        } else {
          user.role = 'User';
        }

        user.save(() => {
          if (err) {
            return response.status(500).json(err);
          }
          return response.status(200).json(user);
        });
      } else {
        return response.status(409).json(err);
      }
    });
  },

  all: (request, response) => {
    User.find((err, users) => {
      if (err) {
        return response.send(err);
      }
      return response.json({
        users,
      });
    });
  },

  getSpecificUser: (request, response) => {
    User.findById(request.params.user_id, (err, user) => {
      if (err) {
        response.status(404).json({ err });
      }
      response.status(201).json(user);
    });
  },

  updateUser: (request, response) => {
    User.findById(request.params.user_id, (err, user) => {
      const access = request.token.body.access;
      if (err || !user) {
        return response.status(404).json(err);
      }

      user.userName = request.body.userName || user.userName;
      user.name.first = request.body.firstName || user.name.first;
      user.name.last = request.body.lastName || user.name.last;
      user.email = request.body.email || user.email;
      user.password = user.generatedHash(request.body.password);

      if (access === 'Admin') {
        user.role = request.body.role || user.role;
      } else {
        user.role = 'User';
      }

      user.save(() => {
        if (err) {
          return response.status(500).send(err);
        }
        return response.json(user);
      });
    });
  },

  deleteUser: (request, response) => {
    User.remove({
      _id: request.params.user_id,
    }, (err, user) => {
      if (err) {
        return response.status(500).json(err);
      }
      return response.json(user);
    });
  },

  signin: (request, response) => {
    User.findOne({ userName: request.body.userName }, (err, user) => {
      if (err) {
        response.status(500).json(err);
      }
      if (user) {
        if (user.validPassword(user, request.body.password)) {
          let token = generateToken(user.userName, user.role);
          token = Object.assign({}, { token }, {
            username: user.userName,
            access: user.role,
          });
          return response.status(202).json(token);
        }
        return response.status(400).json({
          message: 'incorrect username or password'
        });
      }
      return response.status(400).json({
        message: 'Incorrect username or password'
      });
    });
  },

  signout: (request, response) => {
    if (request.token) {
      const token = 0;
      return response.status(200).json(token);
    }
    return response.status(400);
  },
};

function generateToken(userName, role) {
  const claims = {
    sub: userName,
    iss: 'docman',
    access: role,
  };
  const jwt = jwtNo.create(claims, process.env.SECRET);
  const token = jwt.compact();
  return token;
}

module.exports = userCtrller;

