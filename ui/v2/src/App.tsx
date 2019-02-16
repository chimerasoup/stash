import React from 'react';
import { MainNavbar } from './components/main-navbar'
import { Route, Switch } from 'react-router-dom';
import { Stats } from './components/stats';
import { Scenes } from './components/scenes';
import { Performers } from './components/performers';
import { Scene } from './components/scene';

// const routes = [
//   {
//     path: "/",
//     component: Stats
//   },
//   {
//     path: "/scenes",
//     component: Scenes,
//     routes: [
//       {
//         path: "/scenes/:id",
//         component: Scene
//       },
//       // {
//       //   path: "/tacos/cart",
//       //   component: Cart
//       // }
//     ]
//   },
//   {
//     path: "/performers",
//     component: Performers,
//   }
// ];

function App(props: any) {
  return (
    <div className="bp3-dark">
      <MainNavbar />
      <Switch>
        <Route exact path="/" component={Stats} />
        <Route path="/scenes" component={Scenes} />
        <Route path="/scenes/:id" component={Scene} />
        <Route path="/performers" component={Performers} />
      </Switch>
    </div>
  );
}

export default App;
