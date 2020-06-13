import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import { Switch, Route } from "react-router-dom";
import ShopPage from "./pages/shop/Shop";
import Header from "./components/Header/Header";
import SignInSingUp from "./pages/SignInSignUp/SignInSignUp";
import { auth, createUserProfileDocument } from "./Firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        this.setState({
          currentUser: userAuth,
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInSingUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
