import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'siiimple-toast/dist/style.css';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import './index.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App/>}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
