import React from "react";
import { Route, Switch } from "react-router-dom";
import { Scene } from "./Scene";
import SceneList from "./scene-list";

const Scenes = () => (
  <Switch>
    <Route exact={true} path="/scenes" component={SceneList} />
    <Route path="/scenes/:id" component={Scene} />
  </Switch>
);

export default Scenes;
