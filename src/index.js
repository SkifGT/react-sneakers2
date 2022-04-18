import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './index.scss';
import 'macro-css'

import App from './App';

render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

