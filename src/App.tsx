import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import WeatherApp from './components/WeatherApp';

library.add(fas);

function App() {
  return (
    <WeatherApp />
  );
}

export default App;
