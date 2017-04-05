
import React, { PropTypes } from 'react';
import toastr from 'toastr';
import classnames from 'classnames';
import { connect } from 'react-redux';
import * as documentActions from '../../../actions/documentActions';
import { addFlashMessage } from '../../../actions/flashMessages';

class DocumentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);

  }

   onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }



  render() {
    const { errors } = this.state;


    return (
      <div className="row">
        <div className="col s12 m8 l4 offset-m2 offset-l4 z-depth-4 card-panel login-form">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <h4 className="center login-form-text">Add your document</h4>
              </div>
            </div>
            <div className={classnames('row margin', { 'has-error': errors.content })}>
              <div className="input-field col s12">
                <i className="material-icons prefix">title</i>
                <input
                  className="validate"
                  id="title"
                  type="title"
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <label htmlFor="title" className="left-align">title</label>
                {errors.title && <span className="help-block">{errors.title}</span>}
              </div>
            </div>
            <div className={classnames('row margin', { 'has-error': errors.content })}>
              <div className="input-field col s12">
                <i className="material-icons prefix">text</i>
                <input
                  className="validate"
                  id="content"
                  type="content"
                  value={this.state.content}
                  onChange={this.onChange}
                />
                <label htmlFor="content" className="left-align">content</label>
                {errors.content && <span className="help-block">{errors.content}</span>}
              </div>
            </div>


          </form>
        </div>
      </div>
    );
  }

}

DocumentForm.propTypes = {
};


// export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);
export default DocumentForm;
