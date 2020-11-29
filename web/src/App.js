import "./App.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import Login from "./components/login";
import Signup from "./components/signup";
import store from "./components/store/index";
import Menu from "./components/menu";
import Politics from "./components/news/politics";
import Economy from "./components/news/economy";
import International from "./components/news/international";
import Health from "./components/news/Health";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import api from "./components/utils/api";
import { connect } from "react-redux";
import { addNews } from "./components/actions/index";

import routes from "./components/routes";
import SearchAppBar from "./components/forms/SearchAppBar";

const App = connect(
  null,
  mapDispatchToProps
)((props) => {
  useEffect(() => {
    api
      .get(
        "/allthenews?search=Coronavirus&providers=Clarin&searchindataclass=Clarín&categories=NACIONALES%2CLOCALES%2CINTERNACIONALES%2CULTIMAS_NOTICIAS%2CPOLITICA%2CECONOMIA%2CSALUD&startDate=2020-10-01&endDate=2020-11-30"
      )
      .then((result) => {
        props.addNews(result.data);
      });
  });
  return (
    <BrowserRouter>
      <Menu></Menu>
      <Switch>
        <Route exact path={routes.signup} component={Signup} />
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.politics} component={Politics} />
        <Route exact path={routes.economy} component={Economy} />
        <Route exact path={routes.international} component={International} />
        <Route exact path={routes.health} component={Health} />
      </Switch>
    </BrowserRouter>
  );
});
function mapDispatchToProps(dispatch) {
  return {
    addNews: (news) => dispatch(addNews(news)),
  };
}
const ConnectedApp = (props) => {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <SearchAppBar />
        <App />
      </SnackbarProvider>
    </Provider>
  );
};
export default ConnectedApp;
