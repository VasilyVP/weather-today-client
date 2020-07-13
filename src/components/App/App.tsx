import React, { useState, useCallback } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
//import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, CssBaseline, Backdrop } from '@material-ui/core';
import MenuSection from '../MenuSection';
import Weather from '../Weather';
import Options from '../Options';
import SignInUp from '../SignInUp';
import configureStore from '../../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      fontSize: '2rem'
    }
  })
);

const store = configureStore();

function App() {

  const [backdropOpen, setBackdropOpen] = useState(false);

  const backdropSubscription = useCallback(
    () => setBackdropOpen(!store.getState().serviceAvailable)
    , []
  );

  store.subscribe(backdropSubscription);

  const classes = useStyles();

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
                <Weather />
                <SignInUp />
                <Backdrop className={classes.backdrop} open={backdropOpen} >
                  Sorry, service is unavailable now
                </Backdrop>
              </Route>
            </Switch>
          </Container>
        </Router>
      </Provider>
    </>
  );
}

export default App;