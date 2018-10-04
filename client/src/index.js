import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import ErrorBoundry from "./components/ErrorBoundry";

const store = configureStore();
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
