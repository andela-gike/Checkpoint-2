import React, { PropTypes } from 'react';
import { Modal, Button, Row, Input, Pagination } from 'react-materialize';
import moment from 'moment';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DocumentTitle from './DocumentListTitle';
import DocumentContent from './DocumentContent';
import * as DocumentAction from '../../../actions/documentActions';


class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    const { updateDocument } = this.props;
    const { deleteDocument } = this.props;
    const { fetchDocuments } = this.props;
    this.state = {
      id: '',
      userId: '',
      title: '',
      content: '',
      access: '',
      userRoleId: '',
    };
  }
  fieldChange(e) {
    return this.setState({ [e.target.name]: e.target.value, });
  }
  deleteDoc(id) {
    this.props.deleteDocument(id);
  }
  onSelect(pageNo) {
    const offset = (pageNo - 1) * 10;
    this.props.fetchDocuments(offset);
  }
  onSubmit(e) {
    e.preventDefault();
    const id = e.target.id.value;
    const userId = e.target.userId.value;
    const title = e.target.title.value;
    const access = e.target.access.value;
    const content = e.target.content.value;
    const userRoleId = e.target.userRoleId.value;
    const documentDetails = { id, userId, title, access, content, userRoleId };
    this.props.updateDocument(documentDetails);
  }
  render() {
    let pagination = null;
    let doc = null;
    if (this.props.documents && this.props.documents.data ) {
      doc = this.props.documents.data;
      pagination = this.props.documents.pagination;
    }
    return (
      <div>
        { doc ?
          <div className="row">
            {doc.map(document =>
              <div key={document.id}>
                <div className="col s3">
                  <div className="card white darken-1" style={{ height: 300 }}>
                    <div className="card-content black-text">
                      <DocumentTitle document={document} />
                      <DocumentContent document={document} />
                    </div>
                    <div className="card-action">
                      <a>Published: {moment(document.createdAt).format('MMMM Do YYYY')}</a> <br />
                      <div className="card-action">
                        <Modal
                          header="Edit Document"
                          trigger={
                            <i className="small material-icons">mode_edit</i>
                    }
                        >
                          <form
                            className="col s12"
                            method="post" onSubmit={e => this.onSubmit(e)}
                          >
                            <Row>
                              <Input s={6} value="DOC ID" />
                              <Input s={6} name="id" value={document.id} />
                            </Row>
                            <Row>
                              <Input
                                s={6} name="title"
                                value={this.state.title === '' ? document.title : this.state.title}
                                onChange={e => this.fieldChange(e)}
                              />
                              <Input
                                s={6} name="access"
                                value={this.state.access === '' ? document.access : this.state.access}
                                onChange={e => this.fieldChange(e)}
                              />
                              <Input
                                s={6} name="userId"
                                value={this.state.userId === '' ? document.userId : this.state.userId}
                                onChange={e => this.fieldChange(e)}
                              />

                            </Row>
                            <Row>
                              <textarea
                                name="content"
                                value={this.state.content === '' ? document.content : this.state.content}
                                onChange={e => this.fieldChange(e)} label="Content"
                                className="materialize-textarea"
                              />
                            </Row>
                            <Button
                              className="blue"
                              waves="light"
                              type="submit">UPDATE</Button>
                          </form>
                        </Modal>
                        <Button
                          waves="light"
                          onClick={e => this.deleteDoc(document.id)}
                          className="btn-floating left">
                          <i className="small material-icons">delete</i></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      )}
            {pagination ? <Pagination items={pagination.page_count} activePage={2} maxButtons={5} onSelect={e => this.onSelect(e)} /> : ''}
          </div>
      : <div>Not document</div> }
      </div>
    );
  }

  }

DocumentList.propTypes = {
  deleteDocument: React.PropTypes.func.isRequired,
  fetchDocuments: React.PropTypes.func.isRequired,
  updateDocument: React.PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => ({
  updateDocument: documentDetails => dispatch(DocumentAction.updateDocument(documentDetails)),
  deleteDocument: id => dispatch(DocumentAction.deleteDocument(id)),
  fetchDocuments: offset => dispatch(DocumentAction.fetchDocuments(offset))
});

const mapStateToProps = state => ({
  documentDetails: state.documents
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);

