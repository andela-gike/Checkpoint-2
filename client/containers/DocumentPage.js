import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as documentAction from '../actions/documentActions';
import DocumentList from '../components/pages/Documents/DocumentList';

/**
   * @class DocumentPage
   */
class DocumentPage extends React.Component {
  /**
   * @constructor constructor
   * @param {props}  props
   */
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      title: '',
      content: '',
      access: '',
      userRoleId: '',
    };
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
  }
  /**
   * redirectToRolePage
   * @returns {Object}  browserHistory
   */
  redirectToRolePage() {
    browserHistory.push('/documents');
  }
  /**
   * componentDidMount
   * @param {props}  void
   * @return {fetchDocuments} function
   */
  componentDidMount() {
    this.props.fetchDocuments();
  }
  /**
   * render
   * @returns {Object} allFiles
   */
  render() {
    const { documents } = this.props;
    return (
      <div>
        <DocumentList documents={documents} />
      </div>
    );
  }
}

// documentSaver
const mapDispatchToProps = dispatch => ({
  documentSaver: documents => dispatch(documentAction.documentSaver(documents)),
  fetchDocuments: () => dispatch(documentAction.fetchDocuments()),
  updateDocument: () => dispatch(documentAction.updateDocument())
});

const mapStateToProps = state => ({
  documents: state.documents
});
export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
