import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignInUp from '../SignInUp';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, CssBaseline, Backdrop, CircularProgress } from '@material-ui/core';
import MenuSection from '../MenuSection';
import Weather from '../Weather';
import Options from '../Options';
import Notification from '../Notification'
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
  const themeState = useSelector((state: rootStateT) => state.options.theme);

  const theme = createMuiTheme({
    palette: {
      type: themeState,
      background: {
        paper: '#80d8ff'
      },
      primary: {
        main: '#80d8ff'
      },
      secondary: {
        main: '#00b0ff'
      }
    }
  });

  const serviceUnavailableOpen = !useSelector((state: rootStateT) => state.services.serviceAvailable);
  const gettingWeatherOpen = useSelector((state: rootStateT) => state.services.gettingWeather);
  const state = useSelector((state: rootStateT) => state);

  const classes = useStyles();

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);

  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
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
            <Notification />
          </Container>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;