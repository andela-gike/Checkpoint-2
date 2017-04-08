import React, {PropTypes} from 'react';
import TinyMCE from 'react-tinymce';

const DocumentEditor = ({ document, onChange }) => (
  <div>
    <TinyMCE
      content={document.content}
      config={{
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
      }}
      onChange={onChange}
    />
  </div>);

export default DocumentEditor;

