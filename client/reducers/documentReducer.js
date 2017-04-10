import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * [documentReducer description]
 * @param  {[type]} [state=initialState.handleDocuments]
 * @param  {object} action
 * @return {[type]}
 */
export default function
documentReducer(state = initialState.handleDocuments, action) {
  switch (action.type) {
    case types.LOAD_DOCUMENT_SUCCESS:
      return Object.assign({}, ...state, { documents: action.document });

    case types.CHOOSE_AS_CURRENT_DOCUMENT: {
      const chosenDocumentList = state.documents
        .filter(document => document.id === action.id);
      const chosenDocument = chosenDocumentList[0] || {};
      return Object.assign({}, state, { chosenDocument });
    }

    case types.DELETE_CURRENT_DOCUMENT: {
      const newState = JSON.parse(JSON.stringify(state));
      delete newState.chosenDocument;
      return newState;
    }

    case types.UPDATE_DOCUMENT_SUCCESS:
      return [...state.filter(document => document.id !== action.document.id),
        Object.assign({}, { documents: action.document })
      ];

    default:
      return state;
  }
}
