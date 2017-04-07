import React from 'react';
import TextInput from '../../TextInput';

const RoleForm = ({ role, onSave, onChange, loading, errors }) => (
  <form method="POST" style={{ width: 800 }}>
    <TextInput
      name="title"
      label="Title"
      defaultvalue={role.title}
      onChange={onChange}
      error={errors}
    />

    <input
      type="submit"
      disabled={loading}
      value={loading ? 'saving ...' : 'save'}
      className="btn wave-light"
      onClick={onSave}
    />
  </form>
    );

export default RoleForm;
