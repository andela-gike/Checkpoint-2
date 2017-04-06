import React, { PropsTypes } from 'react';
import { connect } from 'react-redux';
import DocumentForm from './DocumentForm';
import * as documentActions from '../../../actions/documentActions';
import CKEditor from './CKEditor';


class DocumentEditor extends React.Component {
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

  // componentDidMount() {
  //    this.props.loadAllDocuments();
  // }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.saveDocument(this.state.document);
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
      <div>
        <DocumentForm
          document={this.state.document}
          onChange={this.updateDocumentState}
          onSave={this.handleFormSubmit}
          errors={this.state.error}
        />
        <div>
          <CKEditor
            document={this.state.document}
            onChange={this.handleEditorchange}
          /></div>
        <center>
          <br />
          <br />
          <button
            type="submit" name="btn_login"
            className="col s12 btn btn-large waves-effect waves-light"
            onClick={this.handleFormSubmit}
          >Add Document
        </button>
        </center>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // loadAllDocuments: () => dispatch(documentActions.loadAllDocuments()),
  saveDocument: document => dispatch(documentActions.saveDocument(document))
});

const mapStateToProps = () => {
  const document = { title: '', content: '', access: '' };
  return {
    documents: document
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentEditor);
