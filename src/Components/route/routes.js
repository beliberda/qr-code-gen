import { Route } from "react-router-dom";

export const routes = (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      {/* в качестве хука на onEnter - статический метод класса Admin */}
      <Route path="/admin" component={Admin} onEnter={Admin.onEnter} />
      <Route path="/genre/:genre" component={Genre}>
        <Route path="/genre/:genre/:release" component={Release} />
      </Route>
      <Route path="/list" component={List} />
      <Route path="/login" component={Login} />
    </Route>
    <Route path="*" component={NotFound} />
  </div>
);
