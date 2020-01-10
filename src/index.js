import React from 'react';
import {bool, string} from 'prop-types';

const fbButton = {
  background: '#fff url(./fb-icon.svg) no-repeat 0 0',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  lineHeight: '24px',
  padding: '10px',
  boxShadow: '0 0 5px rgba(0,0,0,0.2)'
}
const fbIcon = {
  height: '24px',
  width: '24px',
  float: 'left',
  marginRight: '10px'
}

class FbLogin extends React.Component {
  
  componentDidMount(){
    this.initFBLoginScript(this.props)
  }

  initFBLoginScript(props){
    let {appId, autoLogAppEvents, xfbml} = props;

    window.fbAsyncInit = function() {
      window.FB.init({
        appId,
        autoLogAppEvents,
        xfbml,
        version: 'v5.0'
      });
    };
    let tag = document.createElement('script');
    tag.async = true;
    tag.defer = true
    tag.src = "https://connect.facebook.net/en_US/sdk.js";
    document.querySelector('body').appendChild(tag);
  }
  
  facebookLogin(props){
    if('FB' in window){
      window.FB.login((response)=>{
        if (response.authResponse) {
          window.FB.api('/me', {fields: props.fields}, function(response) {
            props.successCallback(response)
          });
        } else {
          props.failureCallback(response)
        }
      });
    }
  }
  
  render(){
    return (
      <button onClick={this.facebookLogin.bind(this,this.props)} className="fb-button" style={fbButton}>
        <span style={fbIcon}><svg enableBackground="new 0 0 128 128" id="Social_Icons" version="1.1" viewBox="0 0 128 128" space="preserve" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><g id="_x31__stroke"><g id="Facebook_1_"><rect fill="none" height="128" width="128"/><path clipRule="evenodd" d="M68.369,128H7.065C3.162,128,0,124.836,0,120.935    V7.065C0,3.162,3.162,0,7.065,0h113.871C124.837,0,128,3.162,128,7.065v113.87c0,3.902-3.163,7.065-7.064,7.065H88.318V78.431    h16.638l2.491-19.318H88.318V46.78c0-5.593,1.553-9.404,9.573-9.404l10.229-0.004V20.094c-1.769-0.235-7.841-0.761-14.906-0.761    c-14.749,0-24.846,9.003-24.846,25.535v14.246H51.688v19.318h16.681V128z" fill="#4460A0" fillRule="evenodd" id="Facebook"/></g></g></svg></span>
        {this.props.children}
      </button>
    )
  }
}

export default FbLogin;

FbLogin.defaultProps = {
  xfbml: true,
  autoLogAppEvents: true,
  children: "Login with Facebook"
}

FbLogin.propTypes = {
  appId: string,
  xfbml: bool,
  autoLogAppEvents: bool,
  fields: string,
  children: string
}