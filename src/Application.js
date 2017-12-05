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

    // setup the path in db
    this.restaurantRef = database.ref("/restaurants");
  }

  componentWillMount() {
    // will change whenever there's a login to logout
    // or vice versa
    // already listening here
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });
      this.restaurantRef.on("value", snapshot => {
        console.log(snapshot.val()); // { name: "df"}
      });
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
