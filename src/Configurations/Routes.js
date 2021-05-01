import { Route, IndexRoute } from "react-router";
import App from "../App";
import Home from "../Screens/Home";

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
);

export default routes;
