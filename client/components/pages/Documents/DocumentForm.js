import React, { PropTypes } from 'react';
import FroalaText from 'froala-editor';
import FroalaEditor from 'react-froala-wysiwyg';
import TextInput from '../../common/TextFields';


const DocumentForm = ({ document, onChange, onSave, errors }) => (
  <form>
    <div className="row">
      <div className="input-field col s4">
        <TextInput
          name="title"
          label="Title"
          defaultvalue={document.title}
          onChange={onChange}
          error={errors} />
        <label for="title">Title</label>
      </div>
      <div className="input-field col s4">
        <TextInput
          name="access"
          label="Access"
          defaultvalue={document.access}
          onChange={onChange}
          error={errors} />
          </div>
      <div className="input-field col s4">
        <TextInput
          name="ownerRoleId"
          label="ownerRoleId"
          defaultvalue={document.ownerRoleId}
          onChange={onChange}
          error={errors} />
      </div>
      <div className="input-field col s4">
        <TextInput
          name="ownerId"
          label="OwnerId"
          defaultvalue={document.ownerId}
          onChange={onChange}
          error={errors} />
      </div>
    </div>
  </form>
);

export default DocumentForm;
