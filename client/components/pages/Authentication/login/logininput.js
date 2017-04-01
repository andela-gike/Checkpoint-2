import React from 'react';

class LoginInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        res => this.context.router.push('/'),
        err => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }
  render() {
    const { errors, identifier, password, isLoading } = this.state;

    return (
      <div className="row">
        <div className="col s12 m8 l4 offset-m2 offset-l4 z-depth-4 card-panel login-form">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <h4 className="center login-form-text">Sign into your account</h4>
              </div>
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input
                  className="validate"
                  id="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <label htmlFor="email" className="left-align">email</label>
                {errors.email && <span className="help-block">{errors.email}</span>}
              </div>
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  className="validate"
                  id="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <label htmlFor="password" className="left-align">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 signup-btn">
                <button
                  className={'btn waves-effect waves-light col s12'}
                  disabled={this.state.isLoading}>
                  Login
                </button>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6 m6 l6">
                <p className="margin medium-small">New user? <a href="/#/signup">Register Now!</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

LoginInput.propTypes = {
  login: React.PropTypes.func.isRequired,
};
 console.log(LoginInput);
export default LoginInput;
// import React, { Component } from 'react';

// export default class Signin extends Component {
//   constructor() {
//     super();

//     this.state = {
//       userInfo: {
//         username: '',
//         password: '',
//       },
//       asyncLoader: {
//         status: '',
//         succeed: false,
//         message: '',
//       },
//     };

//     // Set of validators for signin form
//     this.validators = signinValidators;
//     this.resetValidators();

//     // Correctly Bind class methods to reacts class instance
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.displayValidationErrors = this.displayValidationErrors.bind(this);
//     this.displayAsyncFeedback = this.displayAsyncFeedback.bind(this);
//     this.updateValidators = this.updateValidators.bind(this);
//     this.resetValidators = this.resetValidators.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.isFormValid = this.isFormValid.bind(this);
//   }

//   componentDidMount() {
//     this.store = this.context.store;
//   }

//   handleInputChange(event, inputPropName) {
//     const newState = this.state;
//     newState.userInfo[inputPropName] = event.target.value;
//     this.setState(newState);
//     this.updateValidators(inputPropName, event.target.value);
//   }

//   handleSubmit(e) {
//     const newState = this.state;
//     newState.asyncLoader.status = 'processing';
//     this.setState(newState);
//     this.store.dispatch(actions.signinHandler(this.state.userInfo))
//     .then((info) => {
//       if (info.status === 'success') {
//         this.context.router.push('/dashboard/documents');
//       } else {
//         newState.asyncLoader = {
//           status: 'completed',
//           succeed: false,
//           message: info.error.msg,
//         };
//         this.setState(newState);
//       }
//     });
//     e.preventDefault();
//   }

//   updateValidators(fieldName, value) {
//     this.validators[fieldName].errors = [];
//     this.validators[fieldName].state = value;
//     this.validators[fieldName].valid = true;
//     this.validators[fieldName].rules.forEach((rule) => {
//       if (rule.test instanceof RegExp) {
//         if (!rule.test.test(value)) {
//           this.validators[fieldName].errors.push(rule.message);
//           this.validators[fieldName].valid = false;
//         }
//       } else if (typeof rule.test === 'function') {
//         if (!rule.test(value)) {
//           this.validators[fieldName].errors.push(rule.message);
//           this.validators[fieldName].valid = false;
//         }
//       }
//     });
//   }

//   resetValidators() {
//     Object.keys(this.validators).forEach((fieldName) => {
//       this.validators[fieldName].errors = [];
//       this.validators[fieldName].state = '';
//       this.validators[fieldName].valid = false;
//     });
//   }

//   displayValidationErrors(fieldName) {
//     const rule = this.validators[fieldName];
//     if (rule) {
//       if (!rule.valid) {
//         const errors = rule.errors.map((info, index) => {
//           return <span className="error" key={index}>* {info}</span>;
//         });

//         return (
//           <div className="col s12 row">
//             {errors}
//           </div>
//         );
//       }
//       return '';
//     }
//     return '';
//   }

//   isFormValid() {
//     let status = true;
//     const fields = Object.keys(this.validators);

//     fields.forEach((field) => {
//       if (!this.validators[field].valid) {
//         status = false;
//       }
//     });
//     return status;
//   }

//   displayAsyncFeedback() {
//     if (this.state.asyncLoader.status === 'processing') {
//       return (
//         <div className="row center-align async-loader">
//           <div className="preloader-wrapper small active">
//             <div className="spinner-layer spinner-green-only">
//               <div className="circle-clipper left">
//                 <div className="circle" />
//               </div><div className="gap-patch">
//                 <div className="circle" />
//               </div><div className="circle-clipper right">
//                 <div className="circle" />
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     } else if (this.state.asyncLoader.status === 'completed') {
//       if (!this.state.asyncLoader.succeed) {
//         return (
//           <div className="row center-align async-loader">
//             <span style={{ color: 'red' }}> {this.state.asyncLoader.message}</span>
//           </div>
//         );
//       }
//       return '';
//     }
//     return '';
//   }

//   render() {
//     return (
//       <div className="row">
//         <div className="col s12 m8 l4 offset-m2 offset-l4 z-depth-4 card-panel login-form">
//           <form className="col s12" onSubmit={this.handleSubmit}>
//             <div className="row">
//               <div className="input-field col s12">
//                 <h4 className="center login-form-text">Sign into your account</h4>
//               </div>
//             </div>
//             <div className="row margin">
//               <div className="input-field col s12">
//                 <i className="material-icons prefix">person</i>
//                 <input
//                   id="username"
//                   type="text"
//                   value={this.state.userInfo.username}
//                   onChange={event => this.handleInputChange(event, 'username')}
//                 />
//                 <label htmlFor="username" className="left-align">username</label>
//               </div>
//               { this.displayValidationErrors('username') }
//             </div>
//             <div className="row margin">
//               <div className="input-field col s12">
//                 <i className="material-icons prefix">lock</i>
//                 <input
//                   id="password"
//                   type="password"
//                   value={this.state.userInfo.password}
//                   onChange={event => this.handleInputChange(event, 'password')}
//                 />
//                 <label htmlFor="password" className="left-align">Password</label>
//               </div>
//               { this.displayValidationErrors('password') }
//             </div>
//             { this.displayAsyncFeedback() }
//             <div className="row">
//               <div className="input-field col s12 signup-btn">
//                 <button className={`btn waves-effect waves-light col s12 ${this.isFormValid() ? '' : 'disabled'}`}>
//                   Login
//                 </button>
//               </div>
//             </div>
//             <div className="row">
//               <div className="input-field col s6 m6 l6">
//                 <p className="margin medium-small">New user? <a href="/#/signup">Register Now!</a></p>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// Signin.contextTypes = {
//   store: React.PropTypes.object,
//   router: React.PropTypes.object.isRequired,
// };

