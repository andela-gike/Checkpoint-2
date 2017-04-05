/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentForm from '../../components/pages/Documents/DocumentForm';

class Modal extends React.Component {
  componentDidMount() {
    $('.modal').modal();
    $('select').material_select();
    $('#title').parent().find('label').addClass('active');
  }

  render() {
    const { auth } = this.props;
    return (
      <div>
        <div id="modal1" className="modal">
          <div>
            <a href="#"
              className="btn-floating btn-flat darken-brown 2 closeModal modal-close">
              <i className="material-icons">close</i></a>
          </div>
          <div className="modal-content">
            <h4>Document</h4>
            <DocumentForm auth={auth}/>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  auth: PropTypes.object.isRequired
};

/**
 * [mapStateToProps description]
 * @param  {object} state [description]
 * @return {object}  state     [description]
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Modal);
