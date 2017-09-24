import React from 'react';
import { updateImage, submitImage } from './helpers.js';
import {Card} from 'material-ui/Card';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {imgur} from '../../config/default.json';
import FlatButton from 'material-ui/FlatButton';

axios.defaults.headers.common['Authorization'] = imgur.clientID;
axios.defaults.headers.post['Content-Type'] = imgur.type;

const mapStateToProps = state => {
  return {
    user: state.app.user
  };
};

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
    };
    this.submitImage = submitImage.bind(this);
    this.updateImage = updateImage.bind(this);
  }

  componentDidMount() {
    this.input = document.querySelector('.input');
    this.preview = document.querySelector('.preview');
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <form style={{paddingBottom: '10px'}} onSubmit={(e) => this.submitImage(e, this.props.user.id)}>
          <h2 style={{color: 'midnightblue', textAlign: 'center'}}><u>Upload a new profile picture</u></h2>
          <div style={{position: 'relative', display: 'inline-block'}}>
            <label htmlFor="upload" style={{display: 'block', padding: '10px', color: 'midnightblue', background: 'white', borderRadius: '.2em', transition: 'background .3s', left: '0px', fontStyle: 'italic'}}>
              Select
            </label>
            <input onChange={(e) => this.updateImage(e)} style={{position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', fontSize: '1', width: '100%', height: '100%', opacity: '0', cursor: 'pointer'}} id="upload" className='input' type="file" name='file-upload' accept='image/*'/>
          </div>
          <div style={{paddingTop: '15px'}} className='preview'>
            <p>No files currently selected for upload</p>
          </div><br/>
          <FlatButton onClick={(e) => this.submitImage(e, this.props.user.id)} style={{position: 'absolute', right: '10px', bottom: '10px', backgroundColor: 'white', color: 'midnightblue', fontStyle: 'italic'}}>Submit</FlatButton>
        </form>
      </div>
    );
  }
}


export default connect(mapStateToProps)(Upload);
