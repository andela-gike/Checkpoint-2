import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.config({ silent: true });

const secret = process.env.SECRET || 'Happypeopledontkeepsecret';

const Authentication = {
  verifyUser(request, response, next) {
    const token = request.body.token || request.query.token ||
      request.headers.authorization || request.headers['x-access-token'];
    if (!token) {
      return response.status(401).send({ message: 'No token was provided' });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        response.status(401).send({ message: 'Invalid token' });
      } else {
        request.decodedToken = decoded;
        next();
      }
    });
  },

  verifyAdmin(request, response, next) {
    db.roles
      .findById(request.decodedToken.roleId)
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else {
          return response.status(403).send({
            message:
            'Permission denied, admin only'
          });
        }
      });
  },

  logout(request, response, next) {
    const token = request.headers.token || request.headers.authorization ||
      request.headers['x-access-token'];
    if (!token) {
      return response.status(401).send({ message: 'You must be logged in' });
    }
    const decoded = request.decodedToken;
    if (token && decoded) {
      delete request.headers.token;
      delete request.headers.authorization;
      delete request.headers['x-access-token'];
      delete request.decodedToken;
      next();
    }
  }
};

export default Authentication;
