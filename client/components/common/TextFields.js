import React from 'react';

const TextFields = ({ name, label, onChange, error }) => {
  let wrapperClass = 'row';
  if (error && error.length > 0) {
    wrapperClass += +'has-error';
  }
  return (
    <main>
      <center>
        <div className="row">
          <div className=" col s12">
            <div className={wrapperClass}>
              <label htmlFor={name}>{label}</label>
              <div className="input-field">
                <input
                  type="text"
                  name={name}
                  className=""
                  onChange={onChange} />

              </div>
            </div>
          </div>
        </div>
      </center>
    </main>
  );
};
export default TextFields;
