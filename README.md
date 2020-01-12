# react-fb-signin
Login with Facebook (React Component)

## Installation
```sh
npm install react-fb-signin
```

## Usage
```js
import React from 'react';
import FBLogin from 'react-fb-signin';

class App extends React.Component {
    fbLoginSuccess = (props) => {
        console.log('success', props)
    }

    fbLoginFailure = (props) => {
        console.log('error', props)
    }
    
    render(){
        return (
            <FBLogin
                appId="<your_app_id>"
                fields="email,name,birthday"
                successCallback={this.fbLoginSuccess}
                failureCallback={this.fbLoginFailure}
            >
                Login with Facebook
            </FBLogin>
        )
    }
}

export default App;
```
*Note:** Don't forget to replace <your_app_id> with your facebook app id.

#Component Parameters:-
1. appId - facebook app id (required)
2. fields - user data which you want from the user (except the user name, all other data asks user permission)
3. successCallback - will return user data in json format when user successfully login.
4. failureCallback - will return error when user won't login.
