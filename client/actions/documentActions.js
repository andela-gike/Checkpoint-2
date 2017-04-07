
import request from 'superagent';
import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';


export const createDocument = document => ({
  type: types.CREATE_DOCUMENT,
  document
});

// action creators
export const getDocumentSuccess = documents => ({
  type: types.LOAD_DOCUMENT_SUCCESS,
  documents
});

export const updateDocumentSuccess = document => ({
  type: types.UPDATE_DOCUMENT_SUCCESS,
  document
});

export const createDocumentSuccess = document => ({
  type: types.CREATE_DOCUMENT_SUCCESS,
  document
});

export const deleteDocumentSuccess = document => ({
  type: types.DELETE_DOCUMENT_SUCCESS,
  document
});

// // get roles
// export const documentApi = () => {
//   const token = localStorage.getItem('dms-user');
//   return fetch('/api/documents', {
//     method: 'GET',
//     headers: {
//       'x-access-token': token
//     }
//   }).then((response) => {
//     if (response.status >= 400) {
//       throw new Error('Bad response from server');
//     }
//     return response.json();
//   })
//     .then(documents => documents)
//     .catch((error) => {
//       throw error;
//     });
// };

export const fetchADocument = (documentId) => {
  const token = localStorage.getItem('dms-user');
  return fetch(`/api/roles/${documentId}`, {
    method: 'GET',
    headers: {
      Authorization: token
    }
  })
    .then((response) => {
      if (response.status >= 400) {
        Materialize.toast(`Bad response from server, ${res.body.message}`, 4000, 'rounded');
        throw new Error('Bad response from server');
      } else {
        Materialize.toast(`Document Successfully retrieved, ${res.body.message}`, 4000, 'rounded');
      }
      return response.json();
    })
    .then(document => document)
    .catch((error) => {
      throw error;
    });
};

// thunk
export const fetchDocuments = (offset) => {
  const pageOffset = offset || 0;
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    request
  .get(`/api/documents?offset=${pageOffset}`)
  .set({ 'x-access-token': token })
  .end((err, res) => {
    Materialize.toast(res.body.message, 4000, 'rounded');
    dispatch(getDocumentSuccess(res.body));
  });
  };
};

export const documentSaver = (document) => {
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    request
  .post('/api/documents')
  .send(document)
  .set({ 'x-access-token': token })
  .end((err, res) => {
    Materialize.toast(res.body.message, 4000, 'rounded');
    if (err) {
      return err;
    }
    dispatch(createDocumentSuccess(res.body.document));
    window.location = '/documents';
  });
  };
};


export const updateDocument = (document) => {
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    request
  .put(`/api/documents/${document.id}`)
  .send(document)
  .set({ 'x-access-token': token })
  .end((err, res) => {
    Materialize.toast(res.body.message, 4000, 'rounded');
    if (err) {
      return err;
    }
    window.location = '/documents';
    dispatch(updateDocumentSuccess(res.body.updatedDocument));
  });
  };
};



export const deleteDocument = (id) => {
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    request
  .delete(`/api/documents/${id}`)
  .send(document)
  .set({ 'x-access-token': token })
  .end((err, res) => {
    Materialize.toast(res.body.message, 4000, 'rounded');
    if (err) {
      return err;
    }
    dispatch(deleteDocumentSuccess(res.body.document));
    window.location = '/documents';
  });
  };
};
