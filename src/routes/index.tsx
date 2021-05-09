import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Home from './Home'
import Tasks from './Tasks'

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/tasks' component={Tasks} />
      </Switch>
    </Router>
  );
}

export default Routes