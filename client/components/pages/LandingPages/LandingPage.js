import React from 'react';
import bgimage from '../../../img/doc_man_img.jpg'

/**
 *
*/

const theStyle = {
  backgroundImage: 'url(' + bgimage + ') ',
  overflow: 'hidden',
  backgroundSize: 'cover',
  height:1000,
  width: 1920
};
class Homepage extends React.Component {
  render() {
    return (
      <div style={theStyle}>
      <center>
        <h1 className='white-text'> DOCMAN </h1>
        <h4 className="white-text"> Out with the old in with the new.</h4>
        <h4 className="white-text">Track files through the whole organization</h4>
        <h4 className="white-text">Write. Save. Access. </h4>
        <h4 className="white-text">For everything you’ll do, DocMan is the workspace to get it done!</h4>
        </center>
      </div>
    );
  }

}

export default Homepage;
