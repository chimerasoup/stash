import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { SceneList } from './scene-list'
import { Scene } from './scene'

const Scenes = () => (
  <Switch>
    <Route exact path='/scenes' component={SceneList} />
    <Route path='/scenes/:id' component={Scene} />
  </Switch>
)

export default Scenes