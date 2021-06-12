import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './public/Login';

import Register from './public/Register';
import NotFound from './public/NotFound';
import Dashboard from './private/dashboard/Dashboard';
import Users from './private/users/Users';
import CreateUser from './private/users/CreateUser';
import RedirectToDashboard from './private/ToDashboard';
import UserEdit from './private/users/UserEdit';
import Roles from './private/roles/Roles';
import EditRoles from './private/roles/EditRoles';
import CreateRoles from './private/roles/CreateRoles';
import Products from './private/products/Products';
import EditProducts from './private/products/EditProducts';
import CreateProduct from './private/products/CreateProduct';
import Orders from './private/orders/Orders';
import OrderDetail from './private/orders/OrderDetail';
import Profile from './private/profile/Profile';
import Global from './Global';



function App() {
  return (

    <Global>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/users" exact component={Users} />
            <Route path="/users/create" exact component={CreateUser} />
            <Route path="/users/:id/edit" exact component={UserEdit} />

            <Route path="/roles" exact component={Roles} />
            <Route path="/roles/create" exact component={CreateRoles} />
            <Route path="/roles/:id/edit" exact component={EditRoles} />
            <Route path="/" exact component={RedirectToDashboard} />

            <Route path="/products" exact component={Products} />
            <Route path="/products/create" exact component={CreateProduct} />
            <Route path="/products/:id/edit" exact component={EditProducts} />

            <Route path="/orders" exact component={Orders} />
            <Route path="/orders/:id" exact component={OrderDetail} />


            <Route path="/profile" exact component={Profile} />
            <Route path="*" component={NotFound} />

          </Switch>
        </Router>
      </div>
    </Global>
  );
}

export default App;
