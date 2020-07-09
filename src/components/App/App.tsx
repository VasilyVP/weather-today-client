import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
//import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';
import MenuSection from '../MenuSection';
import CurrentWeather from '../CurrentWeather';
import Options from '../Options';
import SignInUp from '../SignInUp';
import configureStore from '../../store';

const store = configureStore();

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <CssBaseline />
          <MenuSection />
          <Container>
            <Switch>
              <Route path="/options" component={Options} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/">
                <CurrentWeather />
                <SignInUp />
              </Route>
            </Switch>
          </Container>
        </Router>
      </Provider>
    </>
  );
}

export default App;