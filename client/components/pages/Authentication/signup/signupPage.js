import React from 'react';
import { connect } from 'react-redux';
import SignupInput from './signupinput';
import { userSignupRequest } from '../../../../actions/signupActions';
import { addFlashMessage } from '../../../../actions/flashMessages';

class SignupPage extends React.Component {
  render() {

    const { userSignupRequest, addFlashMessage } = this.props;
    return (
      <div>
        <div>
          <SignupInput userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage);
