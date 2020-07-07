import React from 'react';
import { Provider } from 'react-redux';
//import SignUp from '../SignUp';
//import SignIn from '../SignIn';
//import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';
import MenuSection from '../MenuSection';
import CurrentWeather from '../CurrentWeather';
import WeatherForecast from '../WeatherForecast';
import Options from '../Options';
import SignInUp from '../SignInUp';
import configureStore from '../../store';

const store = configureStore();

function App() {
  return (
    <>
      <Provider store={store}>
        <CssBaseline />
        <MenuSection />
        <Container>
          <CurrentWeather />
          <WeatherForecast />
          <Options />
          <SignInUp />
        </Container>
      </Provider>
    </>
  );
}

export default App;