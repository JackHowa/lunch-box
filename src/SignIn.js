import React, { Component } from "react";

// importing bare pieces for auth
import { auth, googleAuthProvider } from "./firebase";

class SignIn extends Component {

  render() {
    return (
      <div className="SignIn">
        <button onClick={() => auth.signInWithPopup(googleAuthProvider)}>
          Sign In
        </button>
      </div>
    );
  }
}

export default SignIn;
