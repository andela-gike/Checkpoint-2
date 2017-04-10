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
        if (role.title === 'admin' || role.id === 1) {
          next();
        } else {
          return response.status(403).send({
            message:
            'Permission denied, admin only'
          });
        }
      });
  }

};

export default Authentication;
