import React from 'react';
import { Link } from 'react-router';
import bgimage from '../common/img/doc_man_img.jpg';

const theStyle = {
  backgroundImage: 'url(' + bgimage + ') ',
  overflow: 'hidden',
  backgroundSize: 'cover',
  height: 1000,
  width: 1350
};
class HomePage extends React.Component {
  render() {
    return (
      <div className="z-depth-8" style={theStyle}>
        <center>
          <h4 className="white-text">DOCMAN</h4>
          <p className="white-text">Out with the old in with the new.</p>
          <p className="white-text">Track files through the whole organization</p>
          <p className="white-text">Write. Save. Access.</p>
          <p className="white-text">For everything you’ll do, DocMan is the workspace to get it done!</p>

          <Link
            to="about"
            className="btn waves-effect waves-light brown"
          >About the app</Link>
        </center>
      </div>
    );
  }
}

export default HomePage;
