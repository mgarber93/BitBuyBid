import React, { Component } from 'react';
import { Card } from 'material-ui/Card';

class ProfilePicture extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{display: 'inline-block', width: '300px', backgroundColor: 'lightsteelblue'}}>
        {
          this.props.photo ? 
            <div style={{width: '100%', maxHeight: '100%', position: 'relative', padding: '5%'}}> 
              <img style={{position: 'relative', maxWidth: '90%', maxHeight: '90%', align: 'center'}} src={this.props.photo}/> 
              <img onClick={() => this.props.toggle()} style={{position: 'absolute', bottom: '20%', right: '20%', width: '10%', zIndex: '10', cursor: 'pointer', opacity: '.4'}} src={'https://f.vimeocdn.com/images_v6/professionals/icon-upload-vimeo-blue.svg'}/> 
            </div> :
            <img onClick={() => this.props.toggle()} style={{maxWidth: '100%', cursor: 'pointer'}} src={'https://f.vimeocdn.com/images_v6/professionals/icon-upload-vimeo-blue.svg'}/>
        }
      </Card>
    );
  }
}

export default ProfilePicture;