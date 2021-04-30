import { Route, IndexRoute } from "react-router";
import App from '../App'
import Home from '../Screens/Home';
import Test from '../Screens/Test';

const routes = (
    <Route path="/" component={App}>
         <IndexRoute component={Home}/>
         <Route path="Test" component={Test}/>
    </Route>
   
);

export default routes;
