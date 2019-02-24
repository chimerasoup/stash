import React from "react";
import { Route, Switch } from "react-router-dom";
import { MainNavbar } from "./components/main-navbar";
import Performers from "./components/performers/performers";
import Scenes from "./components/scenes/scenes";
import { Stats } from "./components/stats";

export class App extends React.Component {
  public render() {
    return (
      <div className="bp3-dark">
        <MainNavbar />
        <Switch>
          <Route exact={true} path="/" component={Stats} />
          <Route path="/scenes" component={Scenes} />
          {/* <Route path="/scenes/:id" component={Scene} /> */}
          <Route path="/performers" component={Performers} />
        </Switch>
      </div>
    );
  }
}
