import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import useAuth from './components/useAuth'

import Main from './components/Main/Main'
import List from './components/List/List'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'
import Alert from './components/Alert/Alert'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Error from './components/Error/Error'

function App() {
  const auth = useAuth()
  return (
      <div className="wrapper">
        <Router>
            <Navbar auth={auth}/>
            <Alert />
          <Switch>
            <PublicRoute path="/" auth={auth} restricted={false} component={()=> <Main auth={auth}/>} exact props={auth} />
            <PublicRoute path="/auth" auth={auth} restricted={true} component={Auth} exact />
            <PrivateRoute path="/list" auth={auth} component={List} />
            <Error />
          </Switch>
        </Router>
      </div>
    )
}

export default App
