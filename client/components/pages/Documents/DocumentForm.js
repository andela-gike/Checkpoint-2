import React, { PropTypes } from 'react';
import TextInput from '../../common/TextFields';
import CKEditor from './CKEditor';


const DocumentForm = ({ document, onChange, onSave, errors }) => (
  <form>
    <center>
      <h2>Add a New Document</h2>
      <div className="row">
        <div className="input-field col s4">
          <TextInput
            name="title"
            label="Title"
            // defaultvalue={document.title}
            onChange={onChange}
            error={errors}
          />
          <label htmlFor="title">Title</label>
        </div>
        <div className="input-field col s4">
          <TextInput
            name="access"
            label="Access"
            // defaultvalue={document.access}
            onChange={onChange}
            error={errors}
          />
        </div>
      </div>

    </center>
  </form>
);

export default DocumentForm;
