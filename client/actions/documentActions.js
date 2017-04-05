import axios from 'axios';
import * as types from './actionTypes';

/**
 * @export
 * @param {any} document
 * @returns {any} document
 */
export function loadDocumentSuccess(document) {
  return {
    type: types.LOAD_DOCUMENT_SUCCESS,
    document
  };
}

/**
 * @export
 * @param {any} document
 * @returns {any} document
 */
export function createDocumentSuccess(document) {
  return {
    type: types.CREATE_DOCUMENT_SUCCESS,
    document
  };
}

/**
 * @export
 * @param {any} document
 * @returns {any} document
 */
export function updateDocumentSuccess(document) {
  return {
    type: types.UPDATE_DOCUMENT_SUCCESS,
    document
  };
}

/**
 * set the chosen document in state
 * @export
 * @param {any} id
 * @returns {any} document id
 */
export function chooseAsCurrentDocument(id) {
  return {
    type: types.CHOOSE_AS_CURRENT_DOCUMENT,
    id
  };
}

/**
 * delete from state the current selected document
 * @return {[type]} [description]
 */
export function deleteCurrentDocument() {
  return {
    type: types.DELETE_CURRENT_DOCUMENT,
  };
}

// /**
//  * @export
//  * @returns {object} documents
//  */
// export function loadUserDocuments() {
//   return (dispatch, getState) => {
//     return axios.get(
//       `user/${getState().auth.user.data.id}/document`)
//       .then((response) => {
//         dispatch(loadDocumentSuccess(response.data));
//       });
//   };
// }

/**
 * @export
 * @returns {object} documents
 */
export function loadAllDocuments() {
  return (dispatch) => {
    return axios.get('/api/documents')
      .then((response) => {
        dispatch(loadDocumentSuccess(response.data));
      }).catch((error) => {
        throw (error);
      });
  };
}

/**
 * @export
 * @param {any} document
 * @returns {object} documents
 */
// export function saveDocument(document) {
//   return (dispatch) => {
//     return axios.post('/api/documents', document)
//       .then(() => {
//         dispatch(loadUserDocuments());
//       }).catch((error) => {
//         throw (error);
//       });
//   };
// }

/**
 * @export
 * @param {any} document
 * @returns {object} documents
 */
export function updateDocument(document) {
  return (dispatch, getState) => {
    const documentId = getState().handleDocuments.chosenDocument;
    return axios.put(`/api/documents/${documentId}`, document)
      .then(() => {
        dispatch(loadUserDocuments());
      }).catch((error) => {
        throw (error);
      });
  };
}

/**
 * @export
 * @param {any} id
 * @returns {object} documents
 */
export function deleteDocument(id) {
  return (dispatch) => {
    return axios.delete(`/api/documents/${id}`)
      .then(() => {
        dispatch(loadUserDocuments());
      }).catch((error) => {
        throw (error);
      });
  };
}
