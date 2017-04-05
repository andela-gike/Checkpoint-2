import React from 'react';
import DocumentForm from './DocumentForm';


class DocumentPage extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div className="row">
           <DocumentForm />
      </div>

    );
  }

}



export default DocumentPage;


