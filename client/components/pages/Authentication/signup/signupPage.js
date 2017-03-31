import React from 'react';
import { connect } from 'react-redux';
import SignupInput from './signupinput';
import { userSignupRequest } from '../../../../actions/signupActions';

class SignupPage extends React.Component {
  render() {

    const { userSignupRequest } = this.props;
    return (
      <div>
        <div>
          <SignupInput userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest })(SignupPage);
