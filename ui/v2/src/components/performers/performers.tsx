import React from "react";
import { Route, Switch } from "react-router-dom";
import { Performer } from "./performer";
import { PerformerList } from "./performer-list";

const Performers = () => (
  <Switch>
    <Route exact={true} path="/performers" component={PerformerList} />
    <Route path="/performers/:id" component={Performer} />
  </Switch>
);

export default Performers;
