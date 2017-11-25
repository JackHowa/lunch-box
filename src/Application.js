import React, { Component } from "react";
import { auth, database } from "./firebase";
import CurrentUser from "./CurrentUser";
import SignIn from "./SignIn";
import NewRestaurant from "./NewRestaurant";
import Restaurants from "./Restaurants";
import "./Application.css";

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  componentWillMount() {
    // will change whenever there's a login to logout
    // or vice versa
    auth.onAuthStateChanged(currentUser => {
      console.info("auth change", currentUser);
      this.setState({ currentUser });
    });
  }

  render() {
    // pull current user off the state obj
    const { currentUser } = this.state;

    return (
      <div className="Application">
        <header className="Application--header">
          <h1>Lunch Rush</h1>
        </header>
        <div>
          {!currentUser && <SignIn />}
          {currentUser && (
            <div>
              <NewRestaurant />
              <CurrentUser user={currentUser} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Application;
