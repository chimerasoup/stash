import React from 'react';
import { MainNavbar } from './components/main-navbar'
import { Route, Switch } from 'react-router-dom';
import { Stats } from './components/stats';
import Scenes from './components/scenes/scenes';
import Performers from './components/performers/performers';

function App(props: any) {
  return (
    <div className="bp3-dark">
      <MainNavbar />
      <Switch>
        <Route exact path="/" component={Stats} />
        <Route path="/scenes" component={Scenes} />
        {/* <Route path="/scenes/:id" component={Scene} /> */}
        <Route path="/performers" component={Performers} />
      </Switch>
    </div>
  );
}

export default App;
