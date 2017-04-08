import db from '../models';

/**
 * Handles pagination
 */
const Pagination = {
  /**
   * Gets all users with pagination
   *
   * @param {Object} request Object containing the request
   * @param {Object} response Object containing the response
   * @returns {Object} res object
   */
  getUserPagination(request, response) {
    request.query.limit = (request.query.limit > 0) ? request.query.limit : 3;
    request.query.offset = (request.query.offset > 0) ? request.query.offset : 0;
    model.User.findAll({
      limit: request.query.limit,
      offset: request.query.offset
    })
      .then(users => res.status(200)
        .send(users));
  }

  /**
   * Gets all documents with pagination
   *
   * @param {Object} request Object containing the request
   * @param {Object} response Object containing the response
   * @returns {Object} res object
   */
  getDocumentsPagination(request, response) {
    request.query.limit = (request.query.limit > 0) ? request.query.limit : 3;
    request.query.offset = (request.query.offset > 0) ? request.query.offset : 0;
    if (request.decoded.RoleId < 2) {
      db.documents.findAll({
        limit: request.query.limit,
        offset: request.query.offset,
        order: '"createdAt" DESC'
      }).then(documents => response.status(200)
        .send(document))
        .catch(error => response.status(400)
          .send(error));
    } else {
      // If user is not an admin show only public documents
      db.documents.findAll({
        limit: request.query.limit,
        offset: request.query.offset,
        order: '"createdAt" DESC',
        where: {
          access: 'public'
        }
      })
        .then(document => response.status(200)
          .send(document))
        // catch errors
        .catch(error => response.status(400)
          .send(error));
    }
  }
}

export default Pagination;
