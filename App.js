import { StatusBar } from 'expo-status-bar';
import React,  {Component}  from 'react';
import Router from './Router';
import { Provider } from 'react-redux';
import InitialLoadData from './src/component/InitialLoadData';
import configureStore from './src/store/configureStore'
import { useFonts } from 'expo-font';
const initialState = {};
const store = configureStore(initialState);

const App = () => {
    const [loaded] = useFonts({
    Roboto: require('./src/assets/fonts/CHESTER-Basic.ttf'),
    net: require('./src/assets/fonts/DustWest.ttf'),
    about: require('./src/assets/fonts/PTSans-Regular.ttf'),
    text1: require('./src/assets/fonts/Catamaran-Regular.ttf'),
    text2: require('./src/assets/fonts/DustWest.ttf'),
    Helvetica: require('./src/assets/fonts/Helvetica.ttf'),
    });
    
    if (!loaded) {
      return null;
    }
  
    return (
      <Provider store={store}>
      <InitialLoadData/>
      <Router/>
      </Provider>
    );
  }


// const App = () => <Router />;

 export default App;
    


