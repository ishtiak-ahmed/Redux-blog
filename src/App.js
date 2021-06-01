import { createContext, useState } from 'react';
import { Route, Router, Switch } from 'react-router';
import './App.css';
import Login from './Components/Login/Login';

export const UserContext = createContext()
function App() {
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={[user, setUser]}>
      <h2>This is Home, welcome {user.fullName}</h2>
      {/* <Router>
        <Switch>
          <Route path='/' exact>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/blog/:id'>
            <h2>This is blog page</h2>
          </Route>
        </Switch>
      </Router> */}
      <h2>Redux Blog Apps</h2>
      {
        user.fullName ? '' :
          <Login></Login>
      }
    </UserContext.Provider>
  );
}

export default App;
