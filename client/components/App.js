import React, { PropTypes } from 'react';
import Navbar from './pages/navbar/navbar';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}</div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};
export default App;
