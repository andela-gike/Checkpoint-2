import React, {PropTypes} from 'react';
import FroalaEditor from 'react-froala-wysiwyg';

const DocumentValue = ({document, onChange}) => {
  return (
    <div>
      <FroalaEditor
  model={this.state.content}
  onModelChange={this.handleModelChange}
/>
      </div>);
};

export default DocumentValue;
