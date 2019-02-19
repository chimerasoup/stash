import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PerformerList } from './performer-list'
import { Performer } from './performer'

const Performers = () => (
  <Switch>
    <Route exact path='/performers' component={PerformerList} />
    <Route path='/performers/:id' component={Performer} />
  </Switch>
)

export default Performers