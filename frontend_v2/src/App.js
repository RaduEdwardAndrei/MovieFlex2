import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import history from './history';
import { loadUser } from './redux/actions/authActions';

import MainPageComponent from './components/mainPage.component'
import NavbarComponent from "./components/navbar.component";
import LoginComponent from "./components/auth/Login";
import RegisterComponent from "./components/auth/Register";
import MovieDetailPage from "./components/moviedetailpage.component.js";
import MovieGenrePage from "./components/moviegenrepage.component.js";
import PlayerControlExample from "./components/watch.component.js";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <NavbarComponent />
            <Switch>
              <Route exact path="/register" component={RegisterComponent}/>
              <Route exact path="/login" component={LoginComponent} />
              <Route exact path="/" component={MainPageComponent} />
              <Route exact path="/movie/:movieId" component={MovieDetailPage} />
              <Route exact path="/movies/:genreId" component={MovieGenrePage} />
              <Route exact path="/watch" component={PlayerControlExample} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
