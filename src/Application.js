import React, { Component } from "react";
import { auth, database } from "./firebase";
import CurrentUser from "./CurrentUser";
import SignIn from "./SignIn";
import NewRestaurant from "./NewRestaurant";
import Restaurants from "./Restaurants";
import map from "lodash/map";

import "./Application.css";

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      restaurants: null
    };

    // setup the path in db
    // ref is the branch on which firebase happens
    this.restaurantRef = database.ref("/restaurants");
  }

  componentWillMount() {
    // will change whenever there's a login to logout
    // or vice versa
    // already listening here
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });

      // only listen for values once the user has logged in
      this.restaurantRef.on("value", snapshot => {
        this.setState({ restaurants: snapshot.val() });
      });
    });
  }

  render() {
    // pull current user off the state obj
    const { currentUser, restaurants } = this.state;

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
              <Restaurants restaurants={restaurants} user={currentUser} />
              <CurrentUser user={currentUser} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Application;
