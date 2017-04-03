import React from 'react';
import classnames from 'classnames';


class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render() {
    const { type, text } = this.props.message;
    return (
      <div className="row" >
        <div className="col s12 l4 m4">
          <div id="card-alert" className={classnames('card', {
            green: type === 'success',
            red: type === 'error'
          })}>
            <div className="card-content white-text">
              <button
                type="button" id="dismissSignup" aria-label="Close"
                onClick={this.onClick} className="close right">
                <span aria-hidden="true">x</span>
              </button>
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
};

export default FlashMessage;
