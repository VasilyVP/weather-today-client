import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
//import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, CssBaseline, Backdrop, CircularProgress } from '@material-ui/core';
import MenuSection from '../MenuSection';
import Weather from '../Weather';
import Options from '../Options';
import SignInUp from '../SignInUp';
import { rootStateT } from '../../store/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      fontSize: '2rem'
    }
  })
);

function App() {
  const serviceUnavailableOpen = !useSelector((state: rootStateT) => state.services.serviceAvailable);
  const gettingWeatherOpen = useSelector((state: rootStateT) => state.services.gettingWeather);

  const classes = useStyles();

  return (
    <>
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
              <Backdrop className={classes.backdrop} open={gettingWeatherOpen} >
                <CircularProgress color="inherit" />
              </Backdrop>
              <Backdrop className={classes.backdrop} open={serviceUnavailableOpen} >
                Sorry, service is unavailable now
              </Backdrop>
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;