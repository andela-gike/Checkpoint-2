import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import { addFlashMessage } from '../../../actions/flashMessages';
import * as documentActions from '../../../actions/documentActions';

class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0
    };
    this.editDocument = this.editDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
  }
  editDocument(e) {
    e.preventDefault();
    const documentId = e.target.id;
    this.props.actions.setCurrentDocument(documentId);
  }
  deleteDocument() {
    const documentId = this.state.id;
    this.props.actions.deleteDocument(documentId)
    .then(() => toastr.success('Document Successfully Deleted'))
    .catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to delete document' });
      toastr.error(
        'Unable to delete document');
    });
    this.setState({ id: 0 });
  }

  renderAlert(e) {
    e.preventDefault();
    let id = this.state.id;
    id = e.target.id;
    this.setState({ show: true, id });
    this.props.swal({
      title: 'Warning!',
      text: 'Are you sure?',
      type: 'info',
      showCancelButton: true,
      onConfirm: this.deleteDocument,
      onCancel: this.props.close,
    });
  }
  render() {
    return (
      <div>

        {this
          .props
          .myDocuments
          .map(document => <div id="card-alert" className="card white"
          key={document.id}>
            <div className="card-content pink-text">
              <a className="pointer tooltipped"
                data-position="bottom" data-delay="50"
                data-tooltip="click on me to view"
                href="#modal1" id={document.id}
                onClick={this.editDocument}>
              Title: {document.title}
              <span className="badge list-badge">
                Access: {document.viewAccess}</span>
              </a>


            </div>
            <div className="fixed-action-btn horizontal click-to-toggle edit">
              <a className="btn-floating pink tooltipped"
                data-position="top" data-delay="50"
                data-tooltip="click to view more"
                >
                <i className="material-icons">more_vert</i>
              </a>
              <ul>
                <li onClick={this.editDocument} className="editDoc">
                  <a href="#modal1"
                  className="btn-floating pink tooltipped"
                  data-position="bottom" data-delay="50"
                  data-tooltip="edit document">
                    <i id={document.id} className="material-icons">mode_edit</i>
                  </a>
                </li>
                <li onClick={this.renderAlert}>
                  <a className="btn-floating red darken-1 tooltipped"
                    data-position="bottom" data-delay="50"
                    data-tooltip="delete document"
                    >
                    <i id={document.id} className="material-icons">delete</i>
                  </a>
                </li>
              </ul>
            </div>
          </div>)}
          <ReduxSweetAlert />
      </div>
    );
  }
}

DocumentList.propTypes = {
  actions: React.PropTypes.object.isRequired,
  myDocuments: React.PropTypes.array.isRequired,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
};

/**
 *
 * dispatch document actions
 * @param {any} dispatch
 * @returns {any}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch),
    swal: bindActionCreators(swal, dispatch),
    close: bindActionCreators(close, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(DocumentList);
