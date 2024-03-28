// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import {BrowserRouter} from 'react-router-dom'
// import { store } from 'redux'
// import { Provider } from 'react-redux'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//      <Provider store={store}>
//     <BrowserRouter>
//     <App />
//     </BrowserRouter>
//     </Provider>
//   </React.StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux'; // Import createStore from Redux
import { Provider } from 'react-redux';

// Define your reducer and initial state
const reducer = (state = {}, action) => {
  // Your reducer logic here
  return state;
};

// Create your Redux store
const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

