import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Users from './private/Users';
import Login from './public/Login';
import Dashboard from './private/Dashboard';
import Register from './public/Register';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/users" exact component={Users} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
