import React, {PropTypes} from 'react';
import TinyMCE from 'react-tinymce';

const DocumentEditor = ({ document, onChange }) => (
  <div>
    <TinyMCE
      content={document.content}
      config={{
        plugins: 'link image preview',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
      }}
      onChange={onChange}
    />
  </div>);

export default DocumentEditor;

