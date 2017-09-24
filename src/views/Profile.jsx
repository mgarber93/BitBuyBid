import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Transactions from '../components/Transactions.jsx';
import ProfilePicture from '../components/ProfilePicture.jsx';
import Upload from '../components/Upload.jsx';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';

const mapStateToProps = state => {
  return {
    user: state.app.user
  };
};

const style = {
  paper: {position: 'relative', width: '90%', padding: '50px', left: '5%', backgroundColor: 'white'},
  transactionsCard: {margin: '0 auto', padding: '10px'},
  information: {display: 'inline-block', paddingLeft: '10px'},
  username: {fontSize: '50px', fontWeight: 'bold'},
  upload: {position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', backgroundColor: 'rgba(0,0,0, 0.5)', zIndex: '100'},
  uploadCard: {position: 'absolute', left: '25%', right: '25%', top: '25%', maxBottom: '50%', margin: 'auto', background: 'lightgrey', padding: '10px', border: '2px solid black', borderRadius: '10px'}
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpload: false
    };
    this.toggleUpload = this.toggleUpload.bind(this);
    this.toggleUploadOff = this.toggleUploadOff.bind(this);
    this.calculateDate = this.calculateDate.bind(this);
  }

  toggleUpload() {
    this.setState({showUpload: !this.state.showUpload});
  }

  toggleUploadOff(e) {
    if (e.target === document.getElementById('upload') && this.state.showUpload) {
      this.setState({showUpload: false});
    }
  }

  calculateDate() {
    let joinedAt = new Date(Date.now() - Date.parse(this.props.user.created_at));
    if (!joinedAt) {
      return '[You are not logged in!]';
    } else if (joinedAt.getHours() < 48) {
      return `${joinedAt.getHours()} hours ago`; 
    } else if (joinedAt.getWeeks() < 8) {
      return `${joinedAt.getWeeks()} weeks ago`; 
    } else {
      return `${joinedAt.getMonths()} months ago`; 
    }
  }

  render() {
    return (
      <div>
        {this.props.user ? 
          <div onClick={(e) => this.toggleUploadOff(e)}>
            <Paper style={style.paper}>
              <Card style={style.transactionsCard}>
                <ProfilePicture toggle={this.toggleUpload} photo={this.props.user.picture}/>
                <div style={style.information}>
                  <div style={style.username}>{this.props.user && this.props.user.first + ' ' + this.props.user.last}</div>
                  <div style={{fontStyle: 'italic'}}>Joined {this.calculateDate()}</div>
                </div>
              </Card>
              <Transactions />
            </Paper>
            {
              this.state.showUpload ? 
                <div id='upload' style={style.upload}>
                  <Card style={style.uploadCard}>
                    <Upload/>
                  </Card>
                </div> :
                null
            }
          </div> : 
          <h1> Not logged in! </h1>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Profile);