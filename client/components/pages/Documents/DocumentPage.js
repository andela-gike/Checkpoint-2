// import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';
// import * as documentActions from '../../../actions/documentActions';
// import DocumentList from '../components/DocumentList';

// /**
//    * @class DocumentPage
//    */
// class DocumentPage extends React.Component {
//   /**
//    * @constructor constructor
//    * @param {props}  props
//    */
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: '',
//       content: '',
//       access: ''
//     };
//     this.redirectToRolePage = this.redirectToRolePage.bind(this);
//   }
//   /**
//    * redirectToRolePage
//    * @returns {Object}  browserHistory
//    */
//   redirectToRolePage() {
//     browserHistory.push('/documents');
//   }
//   /**
//    * componentDidMount
//    * @param {props}  void
//    * @return {fetchDocuments} function
//    */
//   componentDidMount() {
//     this.props.loadAllDocuments();
//   }
//   /**
//    * render
//    * @returns {Object} allFiles
//    */
//   render() {
//     const { documents } = this.props;
//     return (
//       <div>
//         <DocumentList documents={documents} />
//       </div>
//     );
//   }
// }

// // documentSaver
// const mapDispatchToProps = dispatch => ({
//   saveDocument: documents => dispatch(documentActions.saveDocument(documents)),
//   loadAllDocuments: () => dispatch(documentActions.loadAllDocuments()),
//   updateDocument: () => dispatch(documentActions.updateDocument())
// });

// const mapStateToProps = state => ({
//   documents: state.documents
// });
// export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
