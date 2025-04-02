// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// import Router from './router';
import AuthProvider from './context/AuthContext';
import Router from './router';

function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
