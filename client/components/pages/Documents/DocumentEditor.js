import React, {PropTypes} from 'react';
import TinyMCE from 'react-tinymce';

const DocumentEditor = ({ document, onChange }) => (
  <div>
    <TinyMCE
      content={document.content}
      config={{
        plugins: 'link image code | emoticons | pagebreak',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | emoticons | pagebreak',
        code_dialog_height: 200,
        code_dialog_width: 300,
        menubar: "insert",
      }}
      onChange={onChange}
    />
  </div>);

export default DocumentEditor;

