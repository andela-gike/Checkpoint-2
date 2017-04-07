import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentAction from '../actions/documentActions';
import DocumentForm from '../components/pages/Documents/DocumentForm';
import DocumentEditor from '../components/pages/Documents/DocumentEditor';

class DocumentContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: Object.assign({}, this.props.document),
      error: {},
      saving: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.handleEditorchange = this.handleEditorchange.bind(this);
  }

  componentDidMount() {
    this.props.fetchDocuments();
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.documentSaver(this.state.document);
    this.setState({ saving: true });
  }

  handleEditorchange(event) {
    const document = this.state.document;
    document.content = event.target.getContent({ format: 'raw' });
    return this.setState({ document });
  }


  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    return this.setState({ document });
  }
  render() {
    return (
      <form>
        <div className="container">
          <div>
            <h4>Fill in the provided fields below to Create a new document</h4>
          </div>
          <DocumentForm
            document={this.state.document}
            onChange={this.updateDocumentState}
            onSave={this.handleFormSubmit}
            errors={this.state.error}
        />
          <DocumentEditor
            document={this.state.document}
            onChange={this.handleEditorchange}
        />
          <center>
            <br />
            <button
              type="submit" name="btn_login"
              className="col s12 btn btn-medium waves-effect waves-light"
              onClick={this.handleFormSubmit}
          >Add Document
        </button>
          </center>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDocuments: () => dispatch(documentAction.fetchDocuments()),
  documentSaver: document => dispatch(documentAction.documentSaver(document))
});

const mapStateToProps = () => {
  const document = { title: '', content: '', access: '', ownerId: '', ownerRoleId: '' };
  return {
    documents: document
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentContainer);
