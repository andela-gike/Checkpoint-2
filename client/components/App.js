import React, { PropTypes } from 'react';
import Navbar from './pages/navbar/navbar';
import FlashMessageList from './flash/flashMessagelist';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <FlashMessageList />
        {this.props.children}</div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};
export default App;
